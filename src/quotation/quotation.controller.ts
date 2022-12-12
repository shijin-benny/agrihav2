import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { ObjectId } from 'mongoose';

@Controller('quotation')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  @Post()
  create(@Body() createQuotationDto: CreateQuotationDto) {
    return this.quotationService.create(createQuotationDto);
  }

  @Get()
  findAll() {
    return this.quotationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.quotationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateQuotationDto: UpdateQuotationDto,
  ) {
    return this.quotationService.update(id, updateQuotationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.quotationService.remove(id);
  }
}
