import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type projectTypeDocument = projectType & Document;

@Schema({ timestamps: true })
export class projectType {
  @Prop()
  project_type: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  indicator_color: string;

  @Prop()
  bgColor: string;
}

export const projectTypeSchema = SchemaFactory.createForClass(projectType);
