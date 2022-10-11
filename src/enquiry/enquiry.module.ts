import { Module } from '@nestjs/common';
import { EnquiryService } from './enquiry.service';
import { EnquiryController } from './enquiry.controller';
import { MailModule } from '../Mailer/mailer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { enquiry, enquirySchema } from '../schemas/enquiry.schema';

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([{ name: enquiry.name, schema: enquirySchema }]),
  ],

  controllers: [EnquiryController],
  providers: [EnquiryService],
})
export class EnquiryModule {}
