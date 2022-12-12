import { Module } from '@nestjs/common';
import { ProjectRequirementsService } from './project_requirements.service';
import { ProjectRequirementsController } from './project_requirements.controller';
import {
  buildingdetails_tb,
  buildingdetails_tbSchema,
} from '../schemas/buildingdetails.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: buildingdetails_tb.name,
        schema: buildingdetails_tbSchema,
      },
    ]),
  ],

  controllers: [ProjectRequirementsController],
  providers: [ProjectRequirementsService],
})
export class ProjectRequirementsModule {}
