import { Module } from '@nestjs/common';
import { ActivitylogService } from './activitylog.service';
import { ActivitylogController } from './activitylog.controller';
import { Activitylog, ActivitylogSchema } from '../schemas/activitylog.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Activitylog.name, schema: ActivitylogSchema },
    ]),
  ],
  controllers: [ActivitylogController],
  providers: [ActivitylogService],
})
export class ActivitylogModule {}
