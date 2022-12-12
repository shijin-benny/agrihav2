import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './userSchema';
import { Type } from '@nestjs/class-transformer';
import { Project } from './projects.schema';

export type buildingdetails_tbDocument = buildingdetails_tb & Document;

@Schema({ timestamps: true })
export class buildingdetails_tb {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  creator: User;

  @Prop()
  no_of_floors: number;

  @Prop()
  total_area: number;

  @Prop()
  no_of_bedrooms: number;

  @Prop()
  attached_bathrooms: number;

  @Prop()
  total_budget: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Project.name })
  @Type(() => Project)
  project: Project;
}
export const buildingdetails_tbSchema =
  SchemaFactory.createForClass(buildingdetails_tb);
