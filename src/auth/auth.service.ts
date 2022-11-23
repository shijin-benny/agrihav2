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
import { MailService } from '../Mailer/mailer.service';
import { OtpReason, Status, accessType } from '../models/Enums';
import { architects, architectsDocument } from '../schemas/architects.schema';
import {
  LoginSession,
  LoginSessionDocument,
} from '../schemas/login_session.schema';
import { Otp, otpDocument } from '../schemas/otp.schema';
import { register, registerDocument } from '../schemas/register.schema';
import { User, UserDocument } from '../schemas/userSchema';
import { DeviceIp } from './auth.model';
import {
  architect_loginDto,
  GoogleDto,
  mobileLoginDto,
  registerDto,
  verifyMobileDto,
} from './dto/auth.dto';
import { otpService } from './otpService';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private otpService: otpService,
    @InjectModel(Otp.name) private otpModel: Model<otpDocument>,
    @InjectModel(register.name)
    private registerModel: Model<registerDocument>,
    @InjectModel(LoginSession.name)
    private sessionModel: Model<LoginSessionDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(architects.name)
    private architectsModel: Model<architectsDocument>,
    private MailerService: MailService,
  ) {}

  // User Registeration
  async register(registerDta: registerDto) {
    try {
      const Isregistered = await this.registerModel.findOne({
        $and: [{ role: registerDta.role }, { phone: registerDta.phone }],
      });
      if (Isregistered?.status === true) {
        throw new ConflictException('Mobile number Already registered');
      } else if (Isregistered?.status === false) {
        throw new ConflictException('Please try resent otp option');
      }
      let register: Partial<register>;
      let newRegister: registerDocument;
      register = {
        phone: registerDta.phone,
        email: registerDta.email,
        name: registerDta.name,
        role: registerDta.role,
        type: accessType.OTP,
      };
      newRegister = new this.registerModel(register);
      const saveDta = await newRegister.save().catch((error) => {
        console.log(error);
        if (error.code === 11000) {
          throw new ConflictException('Phone number or email already exit');
        }
        throw new NotAcceptableException('Register Data could not be saved');
      });
      const response = await this.otpService.sentOtpMobile(
        registerDta.phone,
        OtpReason.REGISTRATION,
      );
      if (response.status === true) {
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
          let responseDta;
          if (IsregisterDta.role == 'user') {
            let user: Partial<User>;
            let newUser: UserDocument;
            user = {
              registered_id: IsregisterDta._id,
            };
            newUser = new this.userModel(user);
            responseDta = await newUser.save();
            this.MailerService.welcomeMail(IsregisterDta);
          } else if (IsregisterDta.role == 'architect') {
            let architect: Partial<architects>;
            let newArchitect: architectsDocument;
            architect = {
              registered_id: IsregisterDta._id,
            };
            newArchitect = new this.architectsModel(architect);
            responseDta = await newArchitect.save();
            // this.MailerService.notification_mail(IsregisterDta);
          }
          this.MailerService.supportMail(IsregisterDta);
          const token = this.jwtService.sign({
            id: responseDta._id,
          });
          return {
            status: 200,
            message: `${IsregisterDta.role} registeration successfully`,
            role: IsregisterDta.role,
            id: responseDta._id,
            token: token,
          };
        }
      } else {
        throw new NotFoundException(
          'something went wrong please try resent otp option',
        );
      }
    } catch (error) {
      return error;
    }
  }

  // User mobile login
  async mobileLogin(dta: mobileLoginDto) {
    try {
      const phone = parseInt(dta.phone);
      const Isphone = await this.registerModel
        .findOne({
          $and: [
            { role: dta.role },
            { phone: phone },
            { type: accessType.OTP },
          ],
        })
        .exec();
      if (Isphone?.status === true) {
        const response = await this.otpService.sentOtpMobile(
          dta.phone,
          OtpReason.LOGIN,
        );
        if (response?.status === true) {
          const token = this.jwtService.sign({
            reg_id: Isphone._id,
            id: response.OtpDta?._id,
            role: dta.role,
          });
          return { status: 200, token: token };
        }
        return response;
      } else if (Isphone?.status === false) {
        throw new UnauthorizedException(
          'Registeration process is not correct.Please register correctly',
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
    role: string,
  ) {
    const Isregister = await this.registerModel.findOne({ _id: reg_id });
    let userDta;
    if (role == 'user') {
      userDta = await this.userModel.findOne({ registered_id: reg_id });
    } else {
      userDta = await this.architectsModel.findOne({ registered_id: reg_id });
    }
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
          id: userDta._id,
        });
        return {
          status: 200,
          message: `${role} login successfully`,
          role: role,
          id: userDta._id,
          token: token,
        };
      }
    }
  }

  // googleAuthentication
  async googleLogin(googleDto: GoogleDto, deviceDta: DeviceIp) {
    try {
      const IsRegister = await this.registerModel.findOne({
        $and: [{ type: accessType.GOOGLE }, { email: googleDto.email }],
      });
      if (IsRegister) {
        let userDta;
        if (googleDto.role == 'user') {
          userDta = await this.userModel.findOne({
            registered_id: IsRegister._id,
          });
        } else {
          userDta = await this.architectsModel.findOne({
            registered_id: IsRegister._id,
          });
        }
        let session: Partial<LoginSession>;
        let newSession: LoginSessionDocument;
        session = {
          device: deviceDta.device,
          ip: deviceDta.ip,
          status: Status.ACTIVE,
          reason: OtpReason.LOGIN,
          user: IsRegister._id,
        };
        newSession = new this.sessionModel(session);
        newSession.save();
        const token = this.jwtService.sign({
          id: userDta._id,
        });
        return {
          status: 200,
          message: `${googleDto.role} login successfully`,
          role: googleDto.role,
          id: userDta._id,
          token: token,
        };
      } else {
        let register: Partial<register>;
        let newRegister: registerDocument;
        register = {
          phone: null,
          email: googleDto.email,
          name: googleDto.name,
          role: googleDto.role,
          type: accessType.GOOGLE,
        };
        newRegister = new this.registerModel(register);
        const saveDta = await newRegister.save().catch((error) => {
          console.log(error);
          if (error.code === 11000) {
            throw new ConflictException('Phone number or email already exit');
          }
          throw new NotAcceptableException('Register Data could not be saved');
        });
        let session: Partial<LoginSession>;
        let newSession: LoginSessionDocument;
        session = {
          device: deviceDta.device,
          ip: deviceDta.ip,
          status: Status.ACTIVE,
          reason: OtpReason.REGISTRATION,
          user: saveDta._id,
        };
        newSession = new this.sessionModel(session);
        newSession.save();
        let responseDta;
        if (saveDta.role == 'user') {
          let user: Partial<User>;
          let newUser: UserDocument;
          user = {
            registered_id: saveDta._id,
            profile_pic: googleDto.profilePic,
          };
          newUser = new this.userModel(user);
          responseDta = await newUser.save();
          this.MailerService.welcomeMail(saveDta);
        } else if (saveDta.role == 'architect') {
          let architect: Partial<architects>;
          let newArchitect: architectsDocument;
          architect = {
            registered_id: saveDta._id,
          };
          newArchitect = new this.architectsModel(architect);
          responseDta = await newArchitect.save();
          // this.MailerService.notification_mail(IsregisterDta);
        }
        this.MailerService.supportMail(saveDta);
        const token = this.jwtService.sign({
          id: responseDta._id,
        });
        return {
          status: 200,
          message: `${saveDta.role} registeration successfully`,
          role: saveDta.role,
          id: responseDta._id,
          token: token,
        };
      }
    } catch (error) {
      return error;
    }
  }

  async updateType() {
    const update_role = await this.registerModel.updateMany(
      {},
      { $set: { type: 'OTP' } },
    );
    console.log(update_role);
  }

  async validateUser(details: any) {
    return details;
    // const user = await this.userModel.findOne({ email: details.email });
    // if (user) return user;
    // console.log('user not found. creating.....');
    // const newUser = new this.userModel(details);
    // const data = await newUser.save();
    // return data;
  }
  // async testMails() {
  //   const IsregisterDta = {
  //     name: 'shijin',
  //     email: 'shijin.arclif@gmail.com',
  //     phone: '+919747045972',
  //   };
  //   this.MailerService.notification_mail(IsregisterDta);
  // }
}
