import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Timestamp } from 'rxjs';
import { User } from './userSchema';
import { Transform, Type } from '@nestjs/class-transformer';
import { architects } from './architect.schema';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  creator: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: architects.name })
  @Type(() => architects)
  architect_id: architects;

  @Prop()
  project_type: string;

  @Prop()
  projectsub_type: string;

  @Prop()
  project_name: string;

  @Prop()
  starting_date: string;

  @Prop()
  ending_date: string;

  @Prop()
  status: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
