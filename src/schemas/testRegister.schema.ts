import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type testRegisterDocument = testRegister & Document;

@Schema({ timestamps: true })
export class testRegister {
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

  @Prop({ type: String, index: true, required: true })
  role: string;
}

export const testRegisterSchema = SchemaFactory.createForClass(testRegister);
