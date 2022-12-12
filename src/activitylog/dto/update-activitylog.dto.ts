import { PartialType } from '@nestjs/mapped-types';
import { CreateActivitylogDto } from './create-activitylog.dto';

export class UpdateActivitylogDto extends PartialType(CreateActivitylogDto) {}
