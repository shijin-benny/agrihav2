import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type registerDocument = register & Document;

@Schema({ timestamps: true })
export class register {
  @Prop({ type: Number, index: false })
  phone: string;

  @Prop({
    type: String,
    index: { partialFilterExpression: { terms_accepted: true } },
    sparse: true,
  })
  email: string;

  @Prop({ type: String, index: true, sparse: true })
  name: string;

  @Prop({ type: Boolean, index: true, default: false })
  status: boolean;

  @Prop({ type: String, index: true, required: true })
  role: string;

  @Prop({ type: String, index: true, required: true })
  type: string;
}

export const registerSchema = SchemaFactory.createForClass(register);
