import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { registerDto } from '../auth/dto/auth.dto';
import * as moment from 'moment';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { register, registerDocument } from '../schemas/register.schema';

@Injectable()
export class MailService {
  constructor(
    private MailerService: MailerService,
    @InjectModel(register.name) private registerModel: Model<registerDocument>,
  ) {}

  // ============== send receipt and welcome mail helper /
  async welcomeMail(userDta: any) {
    try {
      const date = moment().format('Do MMMM  YYYY');
      const day = moment().format('dddd');
      this.MailerService.sendMail({
        to: userDta.email,
        from: 'noreply.arclif@gmail.com',
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
          console.log(res);
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

  async supportMail(registerDetails) {
    try {
      const date = moment().format('Do MMMM  YYYY');
      const day = moment().format('dddd');
      this.MailerService.sendMail({
        to: 'support.arclif@gmail.com',
        from: 'noreply.arclif@gmail.com',
        subject: 'New registeration',
        html: `  <h4>Date:- ${date}</h4> <br>
        <h4>Username :- ${registerDetails.name}</h4> <br>
        <h4>Email:-${registerDetails.email}</h4> <br>
        <h4>Phone:-${registerDetails.phone}</h4> <br>`,
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

  async enquiryMail(enquiryDetails) {
    try {
      this.MailerService.sendMail({
        to: 'nikhil.arclif@gmail.com',
        from: 'noreply.arclif@gmail.com',
        subject: 'New Enquiry',
        template: './enquiry.hbs',
        context: {
          username: enquiryDetails.username,
          email: enquiryDetails.email,
          message: enquiryDetails.message,
          phone: enquiryDetails.phone,
        },
        attachments: [
          {
            filename: 'logo.png',
            path: join(__dirname, 'public', 'image', 'logo.png'),
            cid: 'logo',
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
    } catch (error) {}
  }

  async projectAdded_mail(projectDta, userDta) {
    try {
      this.MailerService.sendMail({
        to: userDta.registered_id.email,
        from: 'noreply.arclif@gmail.com',
        subject: 'Congratulation',
        template: './projectSuccess.hbs',
        context: {
          name: userDta.registered_id.name,
          projectId: projectDta.project_name,
        },
        attachments: [
          {
            filename: 'logo.png',
            path: join(__dirname, 'public', 'image', 'logo.png'),
            cid: 'logo',
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
      throw new BadRequestException();
    }
  }
  async notification_mail(registerDta) {
    try {
      const userDta = await this.registerModel.find({});
      const date = moment().format('Do MMMM  YYYY');
      const day = moment().format('dddd');
      const emailList = [];
      await userDta.map((items) => {
        emailList.push({ name: items.name, address: items.email });
      });
      emailList.toString();
      this.MailerService.sendMail({
        to: emailList,
        from: 'noreply.arclif@gmail.com',
        subject: 'Congratulation',
        template: './notification.hbs',
        context: {
          date: date,
          day: day,
        },
      })
        .then((res) => {
          console.log(res);
          // return res;
        })
        .catch((error) => {
          console.log(error);
          // throw new Error(error);
        });
    } catch (error) {
      console.log(error);
    }
  }
}
