import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { projectType } from './projectType.schema';

export type projectSubTypeDocument = projectSubType & Document;

@Schema({ timestamps: true })
export class projectSubType {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: projectType.name })
  projectType_id: projectType;

  @Prop()
  projectSub_type: string;

  @Prop()
  image: string;

  @Prop()
  indicator_color: string;

  @Prop()
  bgColor: string;
}

export const projectSubTypeSchema =
  SchemaFactory.createForClass(projectSubType);
