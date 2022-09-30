import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type architectsDocument = architects & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class architects {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  phone: number;

  @Prop()
  email: string;

  @Prop()
  location: string;

  @Prop()
  regno: string;

  @Prop()
  verified: boolean;

  @Prop()
  profilepic: string;

  @Prop()
  coverpic: string;

  @Prop()
  website: string;

  @Prop()
  bio: string;
}

const architectsSchema = SchemaFactory.createForClass(architects);

architectsSchema.index({ title: 'text' });

export { architectsSchema };
