 import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentplansService } from './paymentplans.service';
import { CreatePaymentplanDto } from './dto/create-paymentplan.dto';
import { UpdatePaymentplanDto } from './dto/update-paymentplan.dto';

@Controller('paymentplans')
export class PaymentplansController {
  constructor(private readonly paymentplansService: PaymentplansService) {}

  @Post()
  create(@Body() createPaymentplanDto: CreatePaymentplanDto) {
    return this.paymentplansService.create(createPaymentplanDto);
  }

  @Get()
  findAll() {
    return this.paymentplansService.findAll();
  }

  @Get('allservices')
  findOne() {
    return this.paymentplansService.findOne();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentplanDto: UpdatePaymentplanDto) {
    return this.paymentplansService.update(+id, updatePaymentplanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentplansService.remove(+id);
  }
}
