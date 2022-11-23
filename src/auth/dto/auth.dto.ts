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

  @IsString()
  @IsNotEmpty()
  role: string;
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

  @IsNotEmpty()
  @IsString()
  role: string;
}

export class architect_loginDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(13)
  @MinLength(13)
  phone: string;
}

export class GoogleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  profilePic: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}
