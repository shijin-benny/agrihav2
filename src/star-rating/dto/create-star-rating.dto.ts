import {
  IsNumber,
  IsString,
  IsMongoId,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';

export class CreateStarRatingDto {
  @IsMongoId()
  @IsNotEmpty()
  architect_id: string;

  @IsMongoId()
  @IsNotEmpty()
  user_id: string;

  @IsNumber()
  rating: number;

  @IsString()
  comment: string;
}
