import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Type } from '@nestjs/class-transformer';
import { architects, architectsSchema } from './architects.schema';

export type arcprojectsDocument = arcprojects & Document;

@Schema({ timestamps: true })
export class arcprojects {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: architects.name })
  @Type(() => architects)
  architect_id: architects;

  @Prop()
  projectname: string;

  @Prop()
  location: string;

  @Prop()
  Image: string[];

  @Prop()
  projectarea: string;

  @Prop()
  thumbnail: string;
}
export const arcprojectsSchema = SchemaFactory.createForClass(arcprojects);

architectsSchema.index({ title: 'text' });
