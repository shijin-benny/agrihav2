import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { register } from './register.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: register.name })
  @Type(() => register)
  registered_id: register;

  @Prop({ required: false, default: null })
  name: string;

  @Prop({ lowercase: true, index: true, unique: true, sparse: true })
  secondaryContact: string;

  @Prop({ unique: true, index: true, sparse: true })
  email: string;

  @Prop({ default: null, index: true, sparse: true })
  profession: string;

  @Prop({ default: null })
  profile_pic: string;

  @Prop({ default: null })
  country: string;

  @Prop({ default: null })
  state: string;

  @Prop({ default: null })
  district: string;

  @Prop({ default: null })
  Address: string;

  @Prop({ default: null })
  city: string;

  @Prop({ default: null })
  location: string;

  @Prop({ default: null })
  pincode: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ '$**': 'text' });

export { UserSchema };
