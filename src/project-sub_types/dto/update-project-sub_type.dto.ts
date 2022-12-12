import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectSubTypeDto } from './create-project-sub_type.dto';

export class UpdateProjectSubTypeDto extends PartialType(CreateProjectSubTypeDto) {}
