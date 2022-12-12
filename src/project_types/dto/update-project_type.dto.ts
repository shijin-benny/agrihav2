import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectTypeDto } from './create-project_type.dto';

export class UpdateProjectTypeDto extends PartialType(CreateProjectTypeDto) {}
