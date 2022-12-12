import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type paymentplan_tbDocument = paymentplan_tb & Document;

@Schema({ timestamps: true })
export class paymentplan_tb {
  @Prop()
  plan_name: string;

  @Prop()
  plan_amount: string;

  @Prop()
  initial_payment: string;

  @Prop({
    type: [String],
  })
  plan_services: string[];

  @Prop()
  amount_per_sqrft: number;
}

export const paymentplan_tbSchema =
  SchemaFactory.createForClass(paymentplan_tb);
