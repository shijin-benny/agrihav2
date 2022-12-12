import { Module } from '@nestjs/common';
import { StarRatingService } from './star-rating.service';
import { StarRatingController } from './star-rating.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rating, RatingSchema } from '../schemas/starRating.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }]),
  ],
  controllers: [StarRatingController],
  providers: [StarRatingService],
})
export class StarRatingModule {}
