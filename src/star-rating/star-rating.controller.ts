import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StarRatingService } from './star-rating.service';
import { CreateStarRatingDto } from './dto/create-star-rating.dto';
import { UpdateStarRatingDto } from './dto/update-star-rating.dto';
import { ObjectId } from 'mongoose';

@Controller('star-rating')
export class StarRatingController {
  constructor(private readonly starRatingService: StarRatingService) {}

  @Post()
  create(@Body() createStarRatingDto: CreateStarRatingDto) {
    return this.starRatingService.create(createStarRatingDto);
  }
  @Get()
  findAll() {
    return this.starRatingService.findAll();
  }


  @Get('/:id')
  findOne(@Param('id') architectId: ObjectId) {
    return this.starRatingService.findArchitect_ratings(architectId);
  }
}
