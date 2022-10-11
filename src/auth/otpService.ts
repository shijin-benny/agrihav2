import {
  BadRequestException,
  ConflictException,
  HttpService,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosResponse } from 'axios';
import { log } from 'console';
import { NationalNumber, parsePhoneNumberFromString } from 'libphonenumber-js';
import { Model, ObjectId } from 'mongoose';
import { OtpReason, Status } from '../models/Enums';
import { Otp, otpDocument } from '../schemas/otp.schema';
import { mobileLoginDto, verifyMobileDto } from './dto/auth.dto';
const SMS_API = `682b19a3-7047-11eb-a9bc-0200cd936042`;
@Injectable()
export class otpService {
  constructor(
    private http: HttpService,
    @InjectModel(Otp.name) private otpModel: Model<otpDocument>,
  ) {}
  async sentOtpMobile(phone: string, reason: OtpReason) {
    try {
      const IsOtp = await this.otpModel.findOne({ phone: phone });
      console.log(IsOtp);
      if (IsOtp == null) {
        const numberDetails = parsePhoneNumberFromString(phone);
        if (numberDetails?.country === 'IN') {
          let response: AxiosResponse<any>;
          try {
            response = await this.http
              .post(
                `https://2factor.in/API/V1/${SMS_API}/SMS/+91${numberDetails?.nationalNumber}/AUTOGEN/${reason}`,
              )
              .toPromise();
            if (response.data.Status === 'Success') {
              let otp: Partial<Otp>;
              let newOtp: otpDocument;
              otp = {
                phone: phone,
                session_id: response.data.Details,
                status: Status.PENDING,
                reason: reason,
              };
              newOtp = new this.otpModel(otp);
              const data = await newOtp.save().catch((error) => {
                throw new NotAcceptableException();
              });
              return { status: true, OtpDta: data };
            } else {
              throw new Error('OTP sending failed');
            }
          } catch (error) {
            return error;
          }
        } else {
          throw new Error('Something went Wrong');
        }
      } else {
        throw new ConflictException('OTP session found.Try resent Otp');
      }
    } catch (error) {
      return error;
    }
  }
  async verifyOtp(id: ObjectId, verifyDta: verifyMobileDto) {
    const Isotp = await this.otpModel.findOne({ _id: id });
    if (Isotp === null) {
      throw new NotFoundException('OTP Not Found');
    }
    if (Isotp?.status === Status.EXPIRED) {
      throw new BadRequestException('Otp Expired');
    }
    const mobile = parsePhoneNumberFromString(Isotp.phone);
    if (mobile?.country === 'IN') {
      let response: AxiosResponse<any>;
      try {
        response = await this.http
          .get(
            `https://2factor.in/API/V1/${SMS_API}/SMS/VERIFY/${Isotp.session_id}/${verifyDta.otp}`,
          )
          .toPromise();
      } catch (error) {
        throw new NotFoundException(error.response.data.Details);
      }
      if (response.data.Status === 'Success') {
        const otpDta = await this.otpModel.findOne({ _id: id }).exec();
        otpDta.status = Status.EXPIRED;
        otpDta.save();
        return { status: 'Otp Matched', phone: Isotp.phone };
      } else {
        throw new NotFoundException('OTP verification failed');
      }
    } else {
      throw new Error('Unsupported Country');
    }
  }
}
