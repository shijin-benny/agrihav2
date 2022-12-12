import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentplanDto } from './create-paymentplan.dto';

export class UpdatePaymentplanDto extends PartialType(CreatePaymentplanDto) {}
