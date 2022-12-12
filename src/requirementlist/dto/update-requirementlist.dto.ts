import { PartialType } from '@nestjs/swagger';
import { CreateRequirementlistDto } from './create-requirementlist.dto';

export class UpdateRequirementlistDto extends PartialType(
  CreateRequirementlistDto,
) {}
