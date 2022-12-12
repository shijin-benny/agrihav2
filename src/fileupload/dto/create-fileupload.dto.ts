import { IsArray, IsMongoId, IsString } from 'class-validator';

export class CreateFileuploadDto {
  @IsString()
  title: string;
  @IsArray()
  files: [];

  @IsString()
  project_id: string;
}

export class CreateUserFileuploadDto {
  @IsString()
  description: string;

  @IsArray()
  files: [];

  @IsMongoId()
  project_id: string;
}
