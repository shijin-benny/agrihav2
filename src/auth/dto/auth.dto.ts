import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class registerDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(13)
  @MinLength(13)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(24)
  @MinLength(3)
  name: string;
}

export class verifyMobileDto {
  @IsNotEmpty()
  @IsString()
  otp: string;
}

export class mobileLoginDto {
  @IsNotEmpty()
  @IsString()
  phone: string;
}

export class architect_loginDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(13)
  @MinLength(13)
  phone: string;
}
