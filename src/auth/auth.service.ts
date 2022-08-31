import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { log } from 'console';
import { Model, ObjectId } from 'mongoose';
import { MailService } from 'src/Mailer/mailer.service';
import { OtpReason, Status } from 'src/models/Enums';
import {
  LoginSession,
  LoginSessionDocument,
} from 'src/schemas/login_session.schema';
import { Otp, otpDocument } from 'src/schemas/otp.schema';
import { register, registerDocument } from 'src/schemas/register.schema';
import { User, UserDocument } from 'src/schemas/userSchema';
import { DeviceIp } from './auth.model';
import { mobileLoginDto, registerDto, verifyMobileDto } from './dto/auth.dto';
import { otpService } from './otpService';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private otpService: otpService,
    @InjectModel(Otp.name) private otpModel: Model<otpDocument>,
    @InjectModel(register.name) private registerModel: Model<registerDocument>,
    @InjectModel(LoginSession.name)
    private sessionModel: Model<LoginSessionDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private MailerService: MailService,
  ) {}

  // User Registeration
  async register(registerDta: registerDto) {
    try {
      const IsRegister = await this.registerModel
        .findOne({
          $and: [{ phone: registerDta.phone }, { email: registerDta.email }],
        })
        .exec();
      if (IsRegister?.status === true) {
        throw new ConflictException(
          'Mobile number or Email Already registered',
        );
      } else {
        let register: Partial<register>;
        let newRegister: registerDocument;
        register = {
          phone: registerDta.phone,
          email: registerDta.email,
          name: registerDta.name,
        };
        newRegister = new this.registerModel(register);
        const saveDta = await newRegister.save().catch((error) => {
          if (error.code === 11000) {
            throw new ConflictException('Phone number already exit');
          }
          throw new NotAcceptableException('Register Data could not be saved');
        });
        const response = await this.otpService.sentOtpMobile(
          registerDta.phone,
          OtpReason.REGISTRATION,
        );
        if (response.status) {
          console.log(response);
          console.log(saveDta);
          const token = this.jwtService.sign({
            reg_id: saveDta._id,
            id: response.OtpDta._id,
          });
          return {
            status: 200,
            message: 'OTP send successfully',
            token: token,
          };
        }
        return response;
      }
    } catch (error) {
      return error;
    }
  }
  // register phone number verification
  async verifyMobile(
    verifyDta: verifyMobileDto,
    deviceDta: DeviceIp,
    reg_id: ObjectId,
    id: ObjectId,
  ) {
    try {
      const IsregisterDta = await this.registerModel
        .findOne({
          _id: reg_id,
        })
        .exec();
      if (IsregisterDta && IsregisterDta.status === false) {
        const verifyOtp = await this.otpService.verifyOtp(id, verifyDta);
        if (verifyOtp.status === 'Otp Matched') {
          IsregisterDta.status = true;
          IsregisterDta.save();
          let session: Partial<LoginSession>;
          let newSession: LoginSessionDocument;
          session = {
            device: deviceDta.device,
            ip: deviceDta.ip,
            status: Status.ACTIVE,
            reason: OtpReason.REGISTRATION,
            user: IsregisterDta._id,
          };
          newSession = new this.sessionModel(session);
          newSession.save();
          let user: Partial<User>;
          let newUser: UserDocument;
          user = {
            registered_id: IsregisterDta._id,
          };
          newUser = new this.userModel(user);
          const userData = await newUser.save();
          this.MailerService.welcomeMail(IsregisterDta);
          const token = this.jwtService.sign({
            id: userData._id,
          });
          return {
            status: 200,
            message: 'User registeration successfully',
            token: token,
          };
        }
      } else {
        throw new NotFoundException('Register data not found');
      }
    } catch (error) {
      return error;
    }
  }

  // User mobile login
  async mobileLogin(dta: mobileLoginDto) {
    try {
      const Isphone = await this.registerModel
        .findOne({ phone: dta.phone })
        .exec();
      if (Isphone?.status === true) {
        const response = await this.otpService.sentOtpMobile(
          dta.phone,
          OtpReason.LOGIN,
        );
        console.log(response);
        if (response?.status) {
          const token = this.jwtService.sign({
            reg_id: Isphone._id,
            id: response.OtpDta?._id,
          });
          return { status: 200, token: token };
        }
        return response;
      } else if (Isphone?.status === false) {
        throw new UnauthorizedException(
          'Mobile register verification not completed',
        );
      }
      if (!Isphone) {
        throw new NotFoundException('Not registered mobile number');
      }
    } catch (error) {
      return error;
    }
  }
  async veriyLogin(
    verifyDta: verifyMobileDto,
    reg_id: ObjectId,
    otpId: ObjectId,
    DeviceAndip: DeviceIp,
  ) {
    const Isregister = await this.registerModel.findOne({ _id: reg_id });
    const IsUser = await this.userModel.findOne({ registered_id: reg_id });
    if (Isregister) {
      const response = await this.otpService.verifyOtp(otpId, verifyDta);
      if (response.status === 'Otp Matched') {
        let session: Partial<LoginSession>;
        let newSession: LoginSessionDocument;
        session = {
          device: DeviceAndip.device,
          ip: DeviceAndip.ip,
          status: Status.ACTIVE,
          reason: OtpReason.LOGIN,
          user: Isregister._id,
        };
        newSession = new this.sessionModel(session);
        newSession.save();
        const token = this.jwtService.sign({
          id: IsUser._id,
        });
        return {
          status: 200,
          message: 'User registeration successfully',
          token: token,
        };
      }
    }
  }
}
