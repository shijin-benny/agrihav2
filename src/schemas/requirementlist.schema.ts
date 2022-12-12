import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type requirementlistDocument = requirementlist & Document;

@Schema({ timestamps: true })
export class requirementlist {
  @Prop({ type: String })
  item: string;
}

export const requirementlistSchema =
  SchemaFactory.createForClass(requirementlist);
