import { Module } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { QuotationController } from './quotation.controller';
import { architects, architectsSchema } from '../schemas/architects.schema';
import { quotation, quotationSchema } from '../schemas/quotation.schema';
import { Project, ProjectSchema } from '../schemas/projects.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Activitylog, ActivitylogSchema } from '../schemas/activitylog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: architects.name, schema: architectsSchema },
      { name: quotation.name, schema: quotationSchema },
      { name: Activitylog.name, schema: ActivitylogSchema },
    ]),
  ],
  controllers: [QuotationController],
  providers: [QuotationService],
})
export class QuotationModule {}
