import { IsArray, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateFileuploadDto {
  @IsString()
  title: string;
  @IsArray()
  files: [];

  @IsString()
  project_id: string;
}
