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
import { ProjectRequirementsService } from './project_requirements.service';
import { CreateProjectRequirementDto } from './dto/create-project_requirement.dto';
import { UpdateProjectRequirementDto } from './dto/update-project_requirement.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserById } from '../utils';
import { ObjectId } from 'mongoose';

@Controller('project-requirements')
export class ProjectRequirementsController {
  constructor(
    private readonly projectRequirementsService: ProjectRequirementsService,
  ) {}

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createProjectRequirementDto: CreateProjectRequirementDto,
    @GetCurrentUserById() Jwtdta: any,
  ) {
    return this.projectRequirementsService.create(
      createProjectRequirementDto,
      Jwtdta.id,
    );
  }

  @Get('view')
  @UseGuards(AuthGuard('jwt'))
  findAll(@GetCurrentUserById() Jwtdta: any) {
    return this.projectRequirementsService.findAll(Jwtdta.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateProjectRequirementDto: UpdateProjectRequirementDto,
  ) {
    return this.projectRequirementsService.update(
      id,
      updateProjectRequirementDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.projectRequirementsService.remove(id);
  }
}
