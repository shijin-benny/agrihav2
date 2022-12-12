import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { architects } from './architects.schema';
import { User } from './userSchema';

export type RatingDocument = Rating & Document;

@Schema({ timestamps: true })
export class Rating {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: architects.name,
    required: true,
  })
  @Type(() => architects)
  architect_id: architects;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  @Type(() => User)
  user_id: User;

  @Prop({ required: true, sparse: true })
  rating: number;

  @Prop({ required: false, sparse: true })
  comment: string;
}

const RatingSchema = SchemaFactory.createForClass(Rating);

RatingSchema.index({ title: 'text' });

export { RatingSchema };
