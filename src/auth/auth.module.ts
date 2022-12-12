import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from '../schemas/otp.schema';
import { otpService } from './otpService';
import { JwtModule } from '@nestjs/jwt';
import { Jwtstrategy } from './strategy/jwt.strategy';
import { register, registerSchema } from '../schemas/register.schema';
import {
  LoginSession,
  LoginSessionSchema,
} from '../schemas/login_session.schema';
import { User, UserSchema } from '../schemas/userSchema';
import { MailModule } from '../Mailer/mailer.module';
import { architects, architectsSchema } from '../schemas/architects.schema';
import { TwilioModule } from 'nestjs-twilio';
import { ConfigModule } from '@nestjs/config';
import {
  testRegister,
  testRegisterSchema,
} from '../schemas/testRegister.schema';

@Module({
  imports: [
    HttpModule,
    MailModule,
    JwtModule.register({
      secret: 'super-secret-code',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forFeature([
      { name: Otp.name, schema: OtpSchema },
      { name: register.name, schema: registerSchema },
      { name: LoginSession.name, schema: LoginSessionSchema },
      { name: User.name, schema: UserSchema },
      { name: architects.name, schema: architectsSchema },
      { name: testRegister.name, schema: testRegisterSchema },
    ]),
    TwilioModule.forRoot({
      accountSid: process.env.ACCOUNTSID,
      authToken: process.env.AUTHTOKEN,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, otpService, Jwtstrategy],
})
export class AuthModule {}
