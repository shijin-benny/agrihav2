import { IsString } from 'class-validator';

export class CreateUserDto {}

export class projectDto {
  @IsString()
  id: string;
}
