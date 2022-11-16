import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { FileuploadService } from './fileupload.service';
import { CreateFileuploadDto } from './dto/create-fileupload.dto';
import { ObjectId } from 'mongoose';
import { addfilesDto } from './dto/update-fileupload.dto';

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

  @Put('payment_status/:id')
  update(@Param('id') id: string) {
    return this.fileuploadService.update(id);
  }

  @Delete('file/:id')
  removeFile(@Param('id') id: ObjectId, @Body('filesId') filesId: string) {
    return this.fileuploadService.removeFile(id, filesId);
  }

  @Patch('addfiles/:id')
  updatefiles(@Param('id') id: ObjectId, @Body() addfileDta: addfilesDto) {
    return this.fileuploadService.addfiles(id, addfileDta);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileuploadService.remove(id);
  }
}
