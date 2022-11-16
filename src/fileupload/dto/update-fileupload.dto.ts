import { IsArray, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class addfilesDto {
  @IsString()
  filename: string;

  @IsString()
  url: string;

  _id: string;
}
