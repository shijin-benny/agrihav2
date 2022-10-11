import { Module, HttpModule } from '@nestjs/common';
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
import { architects, architectsSchema } from '../schemas/architect.schema';

@Module({
  imports: [
    HttpModule,
    MailModule,
    JwtModule.register({
      secret: 'super-secret-code',
    }),
    MongooseModule.forFeature([
      { name: Otp.name, schema: OtpSchema },
      { name: register.name, schema: registerSchema },
      { name: LoginSession.name, schema: LoginSessionSchema },
      { name: User.name, schema: UserSchema },
      { name: architects.name, schema: architectsSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, otpService, Jwtstrategy],
})
export class AuthModule {}
