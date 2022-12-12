import { Module } from '@nestjs/common';
import { ProjectSubTypesService } from './project-sub_types.service';
import { ProjectSubTypesController } from './project-sub_types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {projectSubType,projectSubTypeSchema} from '../schemas/projectSub_type.schema'

@Module({
  imports: [MongooseModule.forFeature([
    { name: projectSubType.name, schema: projectSubTypeSchema },

  ])],
  controllers: [ProjectSubTypesController],
  providers: [ProjectSubTypesService]
})
export class ProjectSubTypesModule {}
