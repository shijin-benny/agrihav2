import { Module } from '@nestjs/common';
import { RequirementlistService } from './requirementlist.service';
import { RequirementlistController } from './requirementlist.controller';
import {
  requirementlist,
  requirementlistSchema,
} from '../schemas/requirementlist.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: requirementlist.name, schema: requirementlistSchema },
    ]),
  ],
  controllers: [RequirementlistController],
  providers: [RequirementlistService],
})
export class RequirementlistModule {}
