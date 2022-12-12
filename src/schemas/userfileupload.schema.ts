import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Type } from '@nestjs/class-transformer';
import { Project } from './projects.schema';
import { User } from './userSchema';

export type UserfileuploadDocument = Userfileupload & Document;

@Schema({ timestamps: true })
export class Userfileupload {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Project.name })
  @Type(() => Project)
  project_id: Project;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user_id: User;

  @Prop({ required: true, index: true })
  description: string;

  @Prop()
  files: [];

  @Prop({ default: true, index: true })
  status: boolean;
}

const UserfileuploadSchema = SchemaFactory.createForClass(Userfileupload);

UserfileuploadSchema.index({ title: 'text' });

export { UserfileuploadSchema };
