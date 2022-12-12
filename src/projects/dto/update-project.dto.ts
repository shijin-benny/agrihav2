import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto,CreateArcProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}

export class UpdateArcProjectDto extends PartialType(CreateArcProjectDto) {}