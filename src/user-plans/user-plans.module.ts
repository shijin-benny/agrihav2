import { Module } from '@nestjs/common';
import { UserPlansService } from './user-plans.service';
import { UserPlansController } from './user-plans.controller';
import {
  Project_requirement,
  Project_requirementSchema,
} from '../schemas/project_requirements.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project_requirement.name, schema: Project_requirementSchema },
    ]),
  ],

  controllers: [UserPlansController],
  providers: [UserPlansService],
})
export class UserPlansModule {}
