import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Rating, RatingDocument } from 'src/schemas/starRating.schema';
import { CreateStarRatingDto } from './dto/create-star-rating.dto';
import { UpdateStarRatingDto } from './dto/update-star-rating.dto';

@Injectable()
export class StarRatingService {
  constructor(
    @InjectModel(Rating.name)
    private readonly RatingModel: Model<RatingDocument>,
  ) {}

  async create(createDta: CreateStarRatingDto) {
    try {
      const newRating = new this.RatingModel(createDta);
      const response = await newRating.save().catch((error) => {
        throw new NotAcceptableException(error);
      });
      return { status: 200, data: response };
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const findAll = await this.RatingModel.find();
      return { status: 200, data: findAll };
    } catch (error) {}
  }

  async findArchitect_ratings(architect_id: ObjectId) {
    try {
      const response = await this.RatingModel.find({
        architect_id: architect_id,
      });
      return { status: 200, data: response };
    } catch (error) {
      return error;
    }
  }
}
