import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectTypesService } from './project_types.service';
import { CreateProjectTypeDto } from './dto/create-project_type.dto';
import { UpdateProjectTypeDto } from './dto/update-project_type.dto';
import {ObjectId} from 'mongoose';

@Controller('project-types')
export class ProjectTypesController {
  constructor(private readonly projectTypesService: ProjectTypesService) {}

  @Post()
  create(@Body() createProjectTypeDto: CreateProjectTypeDto) {
    return this.projectTypesService.create(createProjectTypeDto);
  }

  @Get()
  findAll() {
    return this.projectTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.projectTypesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateProjectTypeDto: UpdateProjectTypeDto) {
    return this.projectTypesService.update(id, updateProjectTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.projectTypesService.remove(id);
  }
}
