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
import { UserPlansService } from './user-plans.service';
import { CreateUserPlanDto } from './dto/create-user-plan.dto';
import { UpdateUserPlanDto } from './dto/update-user-plan.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserById } from '../utils';
import { ObjectId } from 'mongoose';

@Controller('user-plans')
export class UserPlansController {
  constructor(private readonly userPlansService: UserPlansService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createUserPlanDto: CreateUserPlanDto,
    @GetCurrentUserById() Jwtdta: any,
  ) {
    return this.userPlansService.create(createUserPlanDto, Jwtdta.id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@GetCurrentUserById() Jwtdta: any) {
    return this.userPlansService.findAll(Jwtdta.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateUserPlanDto: UpdateUserPlanDto,
  ) {
    return this.userPlansService.update(id, updateUserPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.userPlansService.remove(id);
  }
}
