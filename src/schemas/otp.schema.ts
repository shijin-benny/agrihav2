import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { OtpReason } from 'src/models/Enums';
import { Status } from 'src/models/Enums/Status.enum';

export type otpDocument = Otp & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Otp {
  @Prop({ reguired: true })
  phone: string;

  @Prop({ required: true })
  session_id: string;

  @Prop({ required: true })
  status: Status;

  @Prop({ required: true })
  reason: OtpReason;

  createdAt?: boolean | string;
  updatedAt?: boolean | string;
}
export const OtpSchema = SchemaFactory.createForClass(Otp);
OtpSchema.index({ createdAt: 1 }, { expires: '5m' });
