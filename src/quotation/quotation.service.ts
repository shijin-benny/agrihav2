import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateActivitylogDto,
  CreateQuotationDto,
} from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { quotation, quotationDocument } from '../schemas/quotation.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  Activitylog,
  ActivitylogDocument,
} from '../schemas/activitylog.schema';
import { Model, ObjectId } from 'mongoose';
import { Project, ProjectDocument } from '../schemas/projects.schema';

@Injectable()
export class QuotationService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(quotation.name)
    private quotationModel: Model<quotationDocument>,
    @InjectModel(Activitylog.name)
    private ActivitylogModel: Model<ActivitylogDocument>,
  ) {}

  async create(createQuotationDto: CreateQuotationDto) {
    try {
      const datasave = await new this.quotationModel(createQuotationDto).save();
      const projectuser = await this.projectModel
        .find({ _id: createQuotationDto.project_id })
        .exec()
        .then((resp) => {
          return resp.map((res) => {
            return res.creator;
          });
        });

      // console.log(datasave)
      let createActivitylog: CreateActivitylogDto;
      // eslint-disable-next-line prefer-const
      createActivitylog = {
        user: projectuser,
        activity: 'quotation received from architects',
        //project added
        //review added
        //scheduled site visits
        ref: datasave._id,
        architect_id: createQuotationDto.architect_id,
        schedule: null,
      };
      const activity = await new this.ActivitylogModel(
        createActivitylog,
      ).save();
      console.log('project quote:', datasave);
      const IsArchitectId = await this.projectModel
        .findOne({
          $and: [
            { _id: createQuotationDto.project_id },
            { acceptQuotes: { $in: [createQuotationDto.architect_id] } },
          ],
        })
        .exec();
      if (!IsArchitectId) {
        await this.projectModel.updateOne(
          { _id: createQuotationDto?.project_id },
          { $push: { acceptQuotes: createQuotationDto?.architect_id } },
        );
      }
      return {
        status: 200,
        data: datasave,
        message: 'project choosen Data added',
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  findAll() {
    return this.quotationModel.find().exec();
  }

  //projectid pass by value
  async findOne(id: ObjectId) {
    try {
      const biddata = await this.quotationModel
        .find({ project_id: id })
        .sort({ quote: 1 })
        .exec();
      const count = await this.quotationModel
        .find({ project_id: id })
        .countDocuments();
      return {
        status: 200,
        data: biddata,
        count: count,
        message: 'Project bid ,count',
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: ObjectId, updateQuotationDto: UpdateQuotationDto) {
    try {
      const user = await this.quotationModel.findByIdAndUpdate(id, {
        $set: updateQuotationDto,
      });

      if (!user) {
        throw new NotFoundException();
      }
      await this.ActivitylogModel.create({
        user: updateQuotationDto.user_id,
        activity: 'Quotation Accepted',
        ref: updateQuotationDto.project_id,
        architect_id: updateQuotationDto.architect_id,
        schedule: null,
      });
      return user;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  remove(id: ObjectId) {
    return `This action removes a #${id} quotation`;
  }
}
