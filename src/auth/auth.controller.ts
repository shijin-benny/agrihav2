import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserById } from '../utils';
import { DeviceIp } from './auth.model';
import { AuthService } from './auth.service';
import { DeviceAndip } from './deviceandip.decorator';
import {
  architect_loginDto,
  mobileLoginDto,
  registerDto,
  verifyMobileDto,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDta: registerDto) {
    return this.authService.register(registerDta);
  }

  @Post('verify_mobile')
  @UseGuards(AuthGuard('jwt'))
  verifyMobile(
    @Body() verifyMobileDta: verifyMobileDto,
    @DeviceAndip() DeviceAndip: DeviceIp,
    @GetCurrentUserById() Jwtdta: any,
  ) {
    return this.authService.verifyMobile(
      verifyMobileDta,
      DeviceAndip,
      Jwtdta.reg_id,
      Jwtdta.id,
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
    @GetCurrentUserById() Jwtdta: any,
    @DeviceAndip() DeviceAndip: DeviceIp,
  ) {
    console.log(Jwtdta);
    return this.authService.veriyLogin(
      verifyDta,
      Jwtdta.reg_id,
      Jwtdta.id,
      DeviceAndip,
    );
  }

  @Post('architect_login')
  architect_login(@Body() dta: architect_loginDto) {
    return this.authService.architect_login(dta);
  }

  @Post('verify_architectlogin')
  @UseGuards(AuthGuard('jwt'))
  verify_architectlogin(
    @Body() dta: verifyMobileDto,
    @GetCurrentUserById() Jwtdta: any,
    @DeviceAndip() DeviceAndip: DeviceIp,
  ) {
    return this.authService.verify_architectLogin(dta, Jwtdta, DeviceAndip);
  }
}
