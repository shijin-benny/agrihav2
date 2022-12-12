import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetCurrentUserById } from '../utils';
import { DeviceIp } from './auth.model';
import { AuthService } from './auth.service';
import { DeviceAndip } from './deviceandip.decorator';
import {
  architect_loginDto,
  GoogleDto,
  mobileLoginDto,
  registerDto,
  verifyMobileDto,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google/login')
  handleLogin(
    @Body() googleDto: GoogleDto,
    @DeviceAndip() DeviceAndip: DeviceIp,
  ) {
    return this.authService.googleLogin(googleDto, DeviceAndip);
  }

  @Post('register')
  register(@Body() registerDta: registerDto) {
    return this.authService.register(registerDta);
  }

  @Post('verify_mobile')
  @UseGuards(AuthGuard('jwt'))
  verifyMobile(
    @Body() verifyMobileDta: verifyMobileDto,
    @DeviceAndip() DeviceAndip: DeviceIp,
    @Req() Jwtdata: Request,
  ) {
    return this.authService.verifyMobile(
      verifyMobileDta,
      DeviceAndip,
      Jwtdata.user,
    );
  }

  @Post('mobile_login')
  mobile_login(@Body() dta: mobileLoginDto) {
    return this.authService.mobileLogin(dta);
  }

  @Post('verify_login')
  @UseGuards(AuthGuard('jwt'))
  verifyLogin(
    @Body() verifyDta: verifyMobileDto,
    @Req() Jwtdta: Request,
    @DeviceAndip() DeviceAndip: DeviceIp,
  ) {
    return this.authService.veriyLogin(verifyDta, DeviceAndip, Jwtdta.user);
  }

  @Post('test/register')
  testRegister(@Body() registerDta: registerDto) {
    return this.authService.testRegister(registerDta);
  }

  @Post('test/login')
  testLogin(@Body() loginDta: mobileLoginDto) {
    return this.authService.testLogin(loginDta);
  }

  // @Get('update-role')
  // update_dbrole() {
  //   return this.authService.updateType();
  // }
  // @Get('test')
  // @UseGuards(AuthGuard('jwt'))
  // testMail(@Req() Jwtdata: Request) {
  //   return Jwtdata.user;
  // }
}
