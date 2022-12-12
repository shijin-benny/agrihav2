import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectRequirementDto } from './create-project_requirement.dto';

export class UpdateProjectRequirementDto extends PartialType(CreateProjectRequirementDto) {}
