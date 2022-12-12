import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type User_oldDocument = User_old & Document;

@Schema({ timestamps: true })
export class User_old {
  @Prop()
  id: number;

  @Prop()
  firebase_id: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  account_type: number;

  @Prop()
  avatar_url: string;

  @Prop()
  theme: string;

  @Prop()
  phone: number;

  @Prop()
  location: string;

  @Prop()
  avatar_file_name: string;

  @Prop()
  status: number;

  @Prop()
  bio: string;

  @Prop()
  website: string;

  @Prop()
  default_color: string;

  @Prop()
  name_phonetics: string;

  @Prop()
  deactivated: string;

  @Prop()
  referral_id: string;

  @Prop()
  longitude: string;

  @Prop()
  latitude: string;

  @Prop()
  institute: string;
}
const User_oldSchema = SchemaFactory.createForClass(User_old);
export { User_oldSchema };
