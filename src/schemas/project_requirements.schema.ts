import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { User } from './userSchema';
import { Type } from '@nestjs/class-transformer';
import { Project } from './projects.schema';
import { paymentplan_tb } from './paymentplan.schema';

export type Project_requirementDocument = Project_requirement & Document;

@Schema({ timestamps: true })
export class Project_requirement {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  creator: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Project.name })
  @Type(() => Project)
  project_id: Project;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: paymentplan_tb.name })
  @Type(() => paymentplan_tb)
  plan_id: paymentplan_tb;

  @Prop()
  requirements_list: string[];
}

export const Project_requirementSchema =
  SchemaFactory.createForClass(Project_requirement);
