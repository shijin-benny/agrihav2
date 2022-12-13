/* eslint-disable prefer-const */
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
import e from 'express';
import parsePhoneNumberFromString from 'libphonenumber-js';
import mongoose, { Model, ObjectId } from 'mongoose';
import {
  testRegister,
  testRegisterDocument,
} from '../schemas/testRegister.schema';
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
    @InjectModel(testRegister.name)
    private testRegisterModel: Model<testRegisterDocument>,
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
      const checkMobile = parsePhoneNumberFromString(registerDta.phone);
      if (checkMobile?.country === 'IN') {
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
      } else {
        // const response = await this.otpService.TwiliosentOtp(registerDta.phone);
        // if (response.status === 'pending') {
        //   const token = this.jwtService.sign(
        //     {
        //       internationNumber: true,
        //       phone: registerDta.phone,
        //     },
        //     {
        //       expiresIn: '10m',
        //     },
        //   );
        //   return {
        //     status: 200,
        //     message: 'Otp send SuccessFully',
        //     otpToken: token,
        //   };
        // } else {
        //   return { status: 401, error: response };
        // }
      }
    } catch (error) {
      return error;
    }
  }

  // register phone number verification
  async verifyMobile(
    verifyDta: verifyMobileDto,
    deviceDta: DeviceIp,
    jwtdata: any,
  ) {
    try {
      const id = new mongoose.Types.ObjectId(jwtdata.reg_id);
      const IsregisterDta = await this.registerModel
        .findOne({
          _id: id,
        })
        .exec();
      let verifyOtp;
      if (jwtdata.internationNumber) {
        // verifyOtp = await this.otpService.twilioVerifyOtp(
        //   verifyDta,
        //   jwtdata.phone,
        // );
      } else {
        if (IsregisterDta && IsregisterDta.status === false) {
          verifyOtp = await this.otpService.verifyOtp(jwtdata.id, verifyDta);
        } else {
          throw new NotFoundException(
            'something went wrong please try resent otp option',
          );
        }
      }
      if (verifyOtp.status === 'Otp Matched') {
        IsregisterDta.status = true;
        IsregisterDta.save();
        let session: Partial<LoginSession>;
        let newSession: LoginSessionDocument;
        // eslint-disable-next-line prefer-const
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
      const checkMobile = parsePhoneNumberFromString(dta.phone);

      if (Isphone?.status === true) {
        if (checkMobile?.country === 'IN') {
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
        } else {
          // const response = await this.otpService.TwiliosentOtp(dta.phone);
          // if (response.status === 'pending') {
          //   const token = this.jwtService.sign(
          //     {
          //       internationNumber: true,
          //       reg_id: Isphone._id,
          //       phone: dta.phone,
          //       role: dta.role,
          //     },
          //     {
          //       expiresIn: '10m',
          //     },
          //   );
          //   return {
          //     status: 200,
          //     token: token,
          //   };
          // }
        }
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

  async veriyLogin(verifyDta: verifyMobileDto, DeviceAndip: DeviceIp, Jwtdta) {
    console.log(DeviceAndip);
    const Isregister = await this.registerModel.findOne({ _id: Jwtdta.reg_id });
    let userDta;
    if (Jwtdta.role == 'user') {
      userDta = await this.userModel.findOne({ registered_id: Jwtdta.reg_id });
    } else {
      userDta = await this.architectsModel.findOne({
        registered_id: Jwtdta.reg_id,
      });
    }
    if (Isregister) {
      let verifyOtp;
      if (Jwtdta.internationNumber) {
        // verifyOtp = await this.otpService.twilioVerifyOtp(
        //   verifyDta,
        //   Jwtdta.phone,
        // );
      } else {
        verifyOtp = await this.otpService.verifyOtp(Jwtdta.id, verifyDta);
      }
      if (verifyOtp.status === 'Otp Matched') {
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
          message: `${Jwtdta.role} login successfully`,
          role: Jwtdta.role,
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
            profilepic: googleDto.profilePic,
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

  // test  register users
  async testRegister(registerDta: registerDto) {
    try {
      let data = {
        phone: registerDta.phone,
        email: registerDta.email,
        name: registerDta.name,
        role: registerDta.role,
        type: accessType.OTP,
      };
      const IsRegister = await this.registerModel.findOne({
        $and: [{ phone: registerDta.phone }, { role: registerDta.role }],
      });
      if (IsRegister) {
        return {
          status: 201,
          message: 'User already exists',
        };
      }
      const newRegister = await this.registerModel
        .create(data)
        .catch((error) => {
          throw new NotAcceptableException(error);
        });
      let newUser;
      if (registerDta.role === 'user') {
        newUser = await this.userModel
          .create({ registered_id: newRegister._id })
          .catch((error) => {
            throw new NotAcceptableException(error);
          });
      } else {
        newUser = await this.architectsModel
          .create({ registered_id: newRegister._id })
          .catch((error) => {
            throw new NotAcceptableException(error);
          });
      }
      const token = this.jwtService.sign({
        id: newUser._id,
      });
      return {
        status: 200,
        message: `${newRegister.role} registeration successfully`,
        role: newRegister.role,
        id: newUser._id,
        token: token,
      };
    } catch (error) {
      return error;
    }
  }

  // test user login
  async testLogin(loginDta: mobileLoginDto) {
    try {
      const IsLoggedIn = await this.registerModel.findOne({
        $and: [{ phone: loginDta.phone }, { role: loginDta.role }],
      });
      if (IsLoggedIn) {
        let IsUser;
        if (loginDta.role === 'user') {
          IsUser = await this.userModel.findOne({
            registered_id: IsLoggedIn.id,
          });
        } else {
          IsUser = await this.architectsModel.findOne({
            registered_id: IsLoggedIn.id,
          });
        }
        const token = this.jwtService.sign({
          id: IsUser._id,
        });
        return {
          status: 200,
          message: `${loginDta.role} login successfully`,
          role: loginDta.role,
          id: IsUser._id,
          token: token,
        };
      } else {
        return {
          status: 401,
          message: `${loginDta.role} not registered. Please register now`,
        };
      }
    } catch (error) {
      return error;
    }
  }

  // async updateType() {
  //   const update_role = await this.registerModel.updateMany(
  //     {},
  //     { $set: { type: 'OTP' } },
  //   );
  //   console.log(update_role);
  // }

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
