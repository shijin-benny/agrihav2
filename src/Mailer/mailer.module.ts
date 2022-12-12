import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { google } from 'googleapis';
import { MailService } from './mailer.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { register, registerSchema } from '../schemas/register.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'noreply.arclif@gmail.com',
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: nodemailer(),
        },
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    MongooseModule.forFeature([
      { name: register.name, schema: registerSchema },
    ]),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
async function nodemailer() {
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URL = process.env.REDIRECT_URL;
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL,
  );
  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  const token = await oauth2Client.getAccessToken();
  return token;
}
