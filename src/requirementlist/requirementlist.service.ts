import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequirementlistDto } from './dto/create-requirementlist.dto';
import { UpdateRequirementlistDto } from './dto/update-requirementlist.dto';
import {
  requirementlist,
  requirementlistDocument,
} from '../schemas/requirementlist.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RequirementlistService {
  constructor(
    @InjectModel(requirementlist.name)
    private requirementlistModel: Model<requirementlistDocument>,
  ) {}

  async create(createRequirementlistDto: CreateRequirementlistDto) {
    try {
      const datasave = await new this.requirementlistModel(
        createRequirementlistDto,
      ).save();

      return {
        status: 200,
        data: datasave,
        message: 'Requirementlist Data added',
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findAll() {
    try {
      const datasave = await this.requirementlistModel.find({}).exec();

      return { status: 200, data: datasave, message: 'Requirementlist Data' };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} requirementlist`;
  }

  update(id: number, updateRequirementlistDto: UpdateRequirementlistDto) {
    return `This action updates a #${id} requirementlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} requirementlist`;
  }
}
