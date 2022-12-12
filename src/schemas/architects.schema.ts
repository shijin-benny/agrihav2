import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { register } from './register.schema';

export type architectsDocument = architects & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class architects {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: register.name })
  @Type(() => register)
  registered_id: register;

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
  companyName: string;

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

export const architectsSchema = SchemaFactory.createForClass(architects);

architectsSchema.index({ '$**': 'text' }, { sparse: true });
