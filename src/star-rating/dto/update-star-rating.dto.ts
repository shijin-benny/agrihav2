import { PartialType } from '@nestjs/mapped-types';
import { CreateStarRatingDto } from './create-star-rating.dto';

export class UpdateStarRatingDto extends PartialType(CreateStarRatingDto) {}
