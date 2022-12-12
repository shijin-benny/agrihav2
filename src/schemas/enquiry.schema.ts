import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type enquiryDocument = enquiry & Document;

@Schema({ timestamps: true })
export class enquiry {
  @Prop({ type: Number, index: true, unique: true, sparse: true })
  phone: string;

  @Prop({ type: String, index: true, sparse: true, unique: true })
  email: string;

  @Prop({ type: String, index: true, sparse: true })
  username: string;

  @Prop({ type: String, index: true })
  message: string;
}

export const enquirySchema = SchemaFactory.createForClass(enquiry);
