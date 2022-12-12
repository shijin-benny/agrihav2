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
import { ArchitectsService } from './architects.service';
import { CreateArchitectDto } from './dto/create-architect.dto';
import { UpdateArchitectDto } from './dto/update-architect.dto';
import { GetCurrentUserById } from '../utils';
import { ObjectId } from 'mongoose';
import { Request } from 'express';

@Controller('architects')
export class ArchitectsController {
  constructor(private readonly architectsService: ArchitectsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createArchitectDto: CreateArchitectDto,
    @GetCurrentUserById() Jwtdta: any,
  ) {
    return this.architectsService.create(createArchitectDto, Jwtdta.id);
  }

  @Post('/view')
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.architectsService.findAll();
  }

  @Get(':id')
  // @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: ObjectId) {
    return this.architectsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: ObjectId,
    @Body() updateArchitectDto: UpdateArchitectDto,
  ) {
    return this.architectsService.update(id, updateArchitectDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: ObjectId) {
    return this.architectsService.remove(id);
  }
}
