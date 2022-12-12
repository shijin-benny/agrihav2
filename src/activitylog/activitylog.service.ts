import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  Activitylog,
  ActivitylogDocument,
} from '../schemas/activitylog.schema';
import { CreateActivitylogDto } from './dto/create-activitylog.dto';
import { UpdateActivitylogDto } from './dto/update-activitylog.dto';

@Injectable()
export class ActivitylogService {
  constructor(
    @InjectModel(Activitylog.name)
    private ActivitylogModel: Model<ActivitylogDocument>,
  ) {}

  create(createActivitylogDto: CreateActivitylogDto) {
    return 'This action adds a new activitylog';
  }

  findAll() {
    return `This action returns all activitylog`;
  }

  //show activitylogs for architect
  //@params architect id
  async findOne(id: ObjectId) {
    try {
      let activitylogs: any;
      const activities = await this.ActivitylogModel.find({ architect_id: id })
        .populate('user')
        .populate('ref')
        .exec();

      // activitylogs = activities.filter((res) => {

      //   if (res.ref != null)
      //     return res.architect_id == id

      // })

      return { activitylog: activities, message: 'activitylog' };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: ObjectId, updateActivitylogDto: UpdateActivitylogDto) {
    try {
      const Activitylog = await this.ActivitylogModel.findByIdAndUpdate(id, {
        $set: updateActivitylogDto,
      });

      if (!Activitylog) {
        throw new NotFoundException();
      }
      return Activitylog;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  remove(id: ObjectId) {
    return `This action removes a #${id} activitylog`;
  }
}
