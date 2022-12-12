import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  paymentplan_tb,
  paymentplan_tbDocument,
} from '../schemas/paymentplan.schema';
import { CreatePaymentplanDto } from './dto/create-paymentplan.dto';
import { UpdatePaymentplanDto } from './dto/update-paymentplan.dto';

@Injectable()
export class PaymentplansService {
  constructor(
    @InjectModel(paymentplan_tb.name)
    private paymentplanModel: Model<paymentplan_tbDocument>,
  ) {}

  async create(createPaymentplanDto: CreatePaymentplanDto) {
    try {
      console.log(createPaymentplanDto);
      const datasave = await new this.paymentplanModel(
        createPaymentplanDto,
      ).save();

      return { status: 200, data: datasave, message: 'service Data added' };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findAll() {
    var planservices = await this.paymentplanModel
      .find({})
      .exec()
      .then((response) => {
        return response.filter((res) => {
          return res._id != '637780c4d6982150b4e0f903';
        });
      });
    return { status: 200, data: planservices, message: 'plan data' };
  }

  async findOne() {
    let planservice: any;
    var planservices = this.paymentplanModel
      .findOne({ _id: '637780c4d6982150b4e0f903' })
      .exec();
    // .then((response)=>{
    //   planservice=response.map((resp)=>{
    //     return resp.plan_services
    //   })
    //   return planservices
    // })
    // .then( async (response)=>{
    //  const data= response.map((resp)=>{
    //     planservice =resp.plan_services
    //     return resp
    //   })

    // })

    return planservices;
  }

  update(id: number, updatePaymentplanDto: UpdatePaymentplanDto) {
    return `This action updates a #${id} paymentplan`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentplan`;
  }
}
