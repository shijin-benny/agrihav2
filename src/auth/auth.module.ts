import { Module, HttpModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from 'src/schemas/otp.schema';
import { otpService } from './otpService';
import { JwtModule } from '@nestjs/jwt';
import { Jwtstrategy } from './strategy/jwt.strategy';
import { register, registerSchema } from 'src/schemas/register.schema';
import {
  LoginSession,
  LoginSessionSchema,
} from 'src/schemas/login_session.schema';
import { User, UserSchema } from 'src/schemas/userSchema';
import { MailModule } from 'src/Mailer/mailer.module';

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
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, otpService, Jwtstrategy],
})
export class AuthModule {}
