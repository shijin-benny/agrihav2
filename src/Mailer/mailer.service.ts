import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { registerDto } from 'src/auth/dto/auth.dto';
import * as moment from 'moment';

@Injectable()
export class MailService {
  constructor(private MailerService: MailerService) {}

  // ============== send receipt and welcome mail helper /
  async welcomeMail(userDta: any) {
    try {
      const date = moment().format('Do MMMM  YYYY');
      const day = moment().format('dddd');
      this.MailerService.sendMail({
        to: userDta.email,
        from: 't67206475@gmail.com',
        subject: 'Welcome to Agriha.',
        template: './welcome.hbs',
        context: {
          date: date,
          day: day,
        },
        attachments: [
          {
            filename: 'logo.png',
            path: join(__dirname, 'public', 'image', 'logo.png'),
            cid: 'logo',
          },
          {
            filename: 'Linkdin.png',
            path: join(__dirname, 'public', 'image', 'Linkdin.png'),
            cid: 'linkdin',
          },
          {
            filename: 'Twitter.png',
            path: join(__dirname, 'public', 'image', 'Twitter.png'),
            cid: 'Twitter',
          },
          {
            filename: 'Instagram.png',
            path: join(__dirname, 'public', 'image', 'Instagram.png'),
            cid: 'Instagram',
          },
          {
            filename: 'facebook.png',
            path: join(__dirname, 'public', 'image', 'facebook.png'),
            cid: 'Facebook',
          },
          {
            filename: 'Arclif.png',
            path: join(__dirname, 'public', 'image', 'Arclif.png'),
            cid: 'Arclif',
          },
          {
            filename: 'image.png',
            path: join(__dirname, 'public', 'image', 'image.png'),
            cid: 'image',
          },
          {
            filename: 'welcome.png',
            path: join(__dirname, 'public', 'image', 'welcome.png'),
            cid: 'welcome',
          },
        ],
      })
        .then((res) => {
          return res;
        })
        .catch((error) => {
          console.log(error);
          throw new Error(error);
        });
    } catch (error) {
      return error;
    }
  }
}
