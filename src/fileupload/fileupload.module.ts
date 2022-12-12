import { Module } from '@nestjs/common';
import { FileuploadService } from './fileupload.service';
import { FileuploadController } from './fileupload.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '../schemas/projects.schema';
import { Fileupload, FileuploadSchema } from '../schemas/fileupload.schema';
import {
  Userfileupload,
  UserfileuploadSchema,
} from '../schemas/userfileupload.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Fileupload.name, schema: FileuploadSchema },
      { name: Userfileupload.name, schema: UserfileuploadSchema },
    ]),
  ],
  controllers: [FileuploadController],
  providers: [FileuploadService],
})
export class FileuploadModule {}
