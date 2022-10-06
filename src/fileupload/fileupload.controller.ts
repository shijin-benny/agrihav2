import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FileuploadService } from './fileupload.service';
import { CreateFileuploadDto } from './dto/create-fileupload.dto';
import { UpdateFileuploadDto } from './dto/update-fileupload.dto';

@Controller('fileupload')
export class FileuploadController {
  constructor(private readonly fileuploadService: FileuploadService) {}

  @Post()
  create(@Body() createFileuploadDto: CreateFileuploadDto) {
    return this.fileuploadService.create(createFileuploadDto);
  }

  @Get('uploaded_file/:id')
  findDta(@Param('id') id: string) {
    return this.fileuploadService.findDta(id);
  }

  @Get('architect_projects/:id')
  findArchitects_project(@Param('id') id: string) {
    return this.fileuploadService.findArchitects_project(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileuploadDto: UpdateFileuploadDto,
  ) {
    return this.fileuploadService.update(+id, updateFileuploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileuploadService.remove(id);
  }
}
