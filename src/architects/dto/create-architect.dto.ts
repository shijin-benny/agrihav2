
import {
    IsEmail,
    IsString,
    IsNotEmpty,
    IsJWT,
    isNotEmpty,
    IsNumber,
    IsEnum,
    IsPhoneNumber,
    Min,
    IsOptional,
    IsArray,
    IsObject,
  } from 'class-validator';
export class CreateArchitectDto {


    @IsString()
    firstname: string;
  
   
    @IsString()
    lastname: string;

    phone:number;
  
    @IsString()
    email:string;
  
 
    @IsString()
    location: string;


    @IsString()
    regno:string;
    
 
    verified:boolean;
  

    @IsString()
    profilepic:string;

    @IsString()
    coverpic:string;
  

    @IsString()
    website:string;

 
    @IsString()
    address:string;


    @IsString()
    state:string;

    @IsString()
    district:string;


    @IsString()
    country:string;


    @IsString()
    specialized:string;

    registered_id:any;
  
}
export class OldUserDto {

    id: number;
    firebase_id:string;
    email:string;
    name:string;
    username:string;
    account_type:number;
    avatar_url:string;
    theme: string;
    phone: number;
    location:string
    avatar_file_name: string;
    status:number;
    bio:string;
    website: string;
    default_color:string;
    name_phonetics:string;
    deactivated:string;
    referral_id:string;
    longitude:string;
    latitude: string;
    institute: string

} 
export class RegisterDto {

  phone: any;

  name: string;
 
  email: string;

  status: boolean;

  role: string;
}

export class OldPostDto {}

