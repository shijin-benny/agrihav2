import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateFileuploadDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsNotEmpty()
  files: [];

  @IsString()
  @IsNotEmpty()
  project_id: ObjectId;
}
