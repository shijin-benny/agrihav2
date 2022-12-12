import { Module } from '@nestjs/common';
import { ProjectTypesService } from './project_types.service';
import { ProjectTypesController } from './project_types.controller';
import { projectType, projectTypeSchema } from '../schemas/projectType.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: projectType.name, schema: projectTypeSchema },
    ]),
  ],
  controllers: [ProjectTypesController],
  providers: [ProjectTypesService],
})
export class ProjectTypesModule {}
