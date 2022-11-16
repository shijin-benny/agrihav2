import { IsArray, IsString } from 'class-validator';

export class CreateFileuploadDto {
  @IsString()
  title: string;
  @IsArray()
  files: [];

  @IsString()
  project_id: string;
}
