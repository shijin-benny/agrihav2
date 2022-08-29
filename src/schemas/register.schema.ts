import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type registerDocument = register & Document;

@Schema({ timestamps: true })
export class register {
  @Prop({ type: Number, index: true, unique: true, sparse: true })
  phone: string;

  @Prop({ type: String, index: true, sparse: true })
  email: string;

  @Prop({ type: String, index: true, sparse: true })
  name: string;

  @Prop({ type: Boolean, index: true, default: false })
  status: boolean;
}

export const registerSchema = SchemaFactory.createForClass(register);
