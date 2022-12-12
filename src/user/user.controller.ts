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
import { UserService } from './user.service';
import { CreateUserDto, projectDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserById } from '../utils';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  findOne(@GetCurrentUserById() Jwtdta: any) {
    return this.userService.findOne(Jwtdta);
  }
  @Get('userlist')
  getAllUsers() {
    return this.userService.findAllUsers();
  }

  @Patch('update')
  @UseGuards(AuthGuard('jwt'))
  update(
    @GetCurrentUserById() Jwtdta: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(Jwtdta.id, updateUserDto);
  }

  @Post('project_success')
  @UseGuards(AuthGuard('jwt'))
  projectAdded_mail(
    @GetCurrentUserById() Jwtdta: any,
    @Body() projectId: projectDto,
  ) {
    return this.userService.projectAdded_mail(Jwtdta.id, projectId);
  }

  @Get('project_files/:id')
  @UseGuards(AuthGuard('jwt'))
  userProjectfiles(@Param('id') id: string) {
    return this.userService.userProject_files(id);
  }
}
