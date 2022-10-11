import {
  ConflictException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailService } from '../Mailer/mailer.service';
import { enquiry, enquiryDocument } from '../schemas/enquiry.schema';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { UpdateEnquiryDto } from './dto/update-enquiry.dto';

@Injectable()
export class EnquiryService {
  constructor(
    @InjectModel(enquiry.name) private enquiryModel: Model<enquiryDocument>,
    private MailerService: MailService,
  ) {}
  async create(createEnquiryDto: CreateEnquiryDto) {
    let enquiry: Partial<enquiry>;
    let newEnquiry: enquiryDocument;
    enquiry = createEnquiryDto;
    newEnquiry = new this.enquiryModel(enquiry);
    const saveEnquiry = await newEnquiry.save().catch((error) => {
      if (error.code === 11000) {
        throw new ConflictException('Phone number or email already exit');
      }
      throw new NotAcceptableException('Register Data could not be saved');
    });
    this.MailerService.enquiryMail(saveEnquiry);
    return { status: 200, message: 'Enquiry details added successfully' };
  }
}
