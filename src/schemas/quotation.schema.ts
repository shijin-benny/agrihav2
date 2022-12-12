import { Type } from '@nestjs/class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { architects } from './architects.schema';
import { Project } from './projects.schema';
import { User } from './userSchema';

export type quotationDocument = quotation & Document;

@Schema({ timestamps: true })
export class quotation {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Project.name })
  @Type(() => Project)
  project_id: Project;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: architects.name })
  @Type(() => architects)
  architect_id: architects;

  @Prop()
  quote: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user_id: User;

  @Prop()
  status: string; //when the user accept the quote
}

export const quotationSchema = SchemaFactory.createForClass(quotation);
