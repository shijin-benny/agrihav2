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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserById } from 'src/utils';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  findOne(@GetCurrentUserById() Jwtdta: any) {
    return this.userService.findOne(Jwtdta.id);
  }

  @Patch('update')
  @UseGuards(AuthGuard('jwt'))
  update(
    @GetCurrentUserById() Jwtdta: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(Jwtdta.id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
