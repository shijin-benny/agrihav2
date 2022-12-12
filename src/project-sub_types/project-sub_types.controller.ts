import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectSubTypesService } from './project-sub_types.service';
import { CreateProjectSubTypeDto } from './dto/create-project-sub_type.dto';
import { UpdateProjectSubTypeDto } from './dto/update-project-sub_type.dto';
import {ObjectId} from 'mongoose';

@Controller('project-sub-types')
export class ProjectSubTypesController {
  constructor(private readonly projectSubTypesService: ProjectSubTypesService) {}

  @Post()
  create(@Body() createProjectSubTypeDto: CreateProjectSubTypeDto) {
    return this.projectSubTypesService.create(createProjectSubTypeDto);
  }

  @Get()
  findAll() {
    return this.projectSubTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.projectSubTypesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateProjectSubTypeDto: UpdateProjectSubTypeDto) {
    return this.projectSubTypesService.update(id, updateProjectSubTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.projectSubTypesService.remove(id);
  }
}
