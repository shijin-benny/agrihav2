import { Module } from '@nestjs/common';
import { PaymentplansService } from './paymentplans.service';
import { PaymentplansController } from './paymentplans.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  paymentplan_tb,
  paymentplan_tbSchema,
} from '../schemas/paymentplan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: paymentplan_tb.name, schema: paymentplan_tbSchema },
    ]),
  ],
  controllers: [PaymentplansController],
  providers: [PaymentplansService],
})
export class PaymentplansModule {}
