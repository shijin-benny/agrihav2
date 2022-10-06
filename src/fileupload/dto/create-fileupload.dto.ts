import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateFileuploadDto {
  title: string;

  files: [];

  project_id: ObjectId;
}
