import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId, Document } from 'mongoose';
import { User } from './userSchema';
import { Project } from './projects.schema';
import { architects } from './architects.schema';
import { Type } from 'class-transformer';

export type ActivitylogDocument = Activitylog & Document;

@Schema({ timestamps: true })
export class Activitylog {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user: User;

  @Prop()
  activity: string;
  //project added
  //review added
  //scheduled site visits
  //**********************************update here */

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Project.name })
  @Type(() => Project)
  ref: Project;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: architects.name })
  @Type(() => architects)
  architect_id: architects;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  schedule: ObjectId;
}

export const ActivitylogSchema = SchemaFactory.createForClass(Activitylog);
