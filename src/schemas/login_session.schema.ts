import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { registerDocument } from './register.schema';

export type LoginSessionDocument = LoginSession & mongoose.Document;

@Schema({ timestamps: true })
export class LoginSession {
  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  device: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  reason: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'registerDocument',
    required: false,
  })
  user: registerDocument;
}

export const LoginSessionSchema = SchemaFactory.createForClass(LoginSession);
