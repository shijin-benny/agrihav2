import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Type } from '@nestjs/class-transformer';
import { Project } from './projects.schema';

export type FileuploadDocument = Fileupload & Document;

@Schema({ timestamps: true })
export class Fileupload {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Project.name })
  @Type(() => Project)
  project_id: Project;

  @Prop({ required: true, index: true })
  title: string;

  @Prop()
  files: [];

  @Prop({ default: true, index: true })
  status: boolean;

  @Prop({ default: false })
  payment_status: boolean;
}

const FileuploadSchema = SchemaFactory.createForClass(Fileupload);

FileuploadSchema.index({ title: 'text' });

export { FileuploadSchema };
