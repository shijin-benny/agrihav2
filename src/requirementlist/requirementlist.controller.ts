import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequirementlistService } from './requirementlist.service';
import { CreateRequirementlistDto } from './dto/create-requirementlist.dto';
import { UpdateRequirementlistDto } from './dto/update-requirementlist.dto';

@Controller('requirementlist')
export class RequirementlistController {
  constructor(private readonly requirementlistService: RequirementlistService) {}

  @Post()
  create(@Body() createRequirementlistDto: CreateRequirementlistDto) {
    return this.requirementlistService.create(createRequirementlistDto);
  }

  @Get()
  findAll() {
    return this.requirementlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requirementlistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequirementlistDto: UpdateRequirementlistDto) {
    return this.requirementlistService.update(+id, updateRequirementlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requirementlistService.remove(+id);
  }
}
