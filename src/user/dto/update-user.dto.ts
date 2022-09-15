import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MaxLength(24)
  @MinLength(3)
  name: string;

  @IsString()
  profile_pic: string;

  @IsString()
  country: string;

  @IsString()
  profession: string;

  @IsString()
  state: string;

  @IsString()
  district: string;

  @IsString()
  Address: string;

  @IsString()
  city: string;

  @IsString()
  location: string;

  @IsString()
  pincode: string;
}
