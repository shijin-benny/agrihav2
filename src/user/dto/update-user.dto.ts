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
  @IsNotEmpty()
  @IsString()
  @MaxLength(24)
  @MinLength(3)
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(24)
  lastname: string;

  @IsString()
  profile_pic: string;

  @IsString()
  bio: string;

  @IsString()
  country: string;

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

  @IsNumber()
  pincode: number;
}
