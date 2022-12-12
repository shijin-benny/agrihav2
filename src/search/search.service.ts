import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from '../schemas/userSchema';
import { architects, architectsDocument } from '../schemas/architects.schema';
import {
  arcprojects,
  arcprojectsDocument,
} from '../schemas/arcprojects.schema';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(architects.name)
    private architectsModel: Model<architectsDocument>,
    @InjectModel(arcprojects.name)
    private ProjectsModel: Model<arcprojectsDocument>,
  ) {}

  find(options) {
    return this.architectsModel
      .find(options)
      .collation({ locale: 'en', strength: 2 });
  }

  count(options) {
    return this.architectsModel.countDocuments(options).exec();
  }

  async getCompanyNames() {
    try {
      return this.architectsModel.find({}).select('companyname');
    } catch (error) {
      return error;
    }
  }

  async searchAll(key, Page) {
    try {
      console.log(key, Page);
      const page = Page || 1;
      const limit = 5;
      const skip = (page - 1) * limit;
      if (key) {
        const options1 = {
          $or: [
            { firstname: { $regex: key.toString(), $options: 'i' } },
            { lastname: { $regex: key.toString(), $options: 'i' } },
            { location: { $regex: key.toString(), $options: 'i' } },
          ],
        };
        const options2 = {
          $or: [
            { location: { $regex: key.toString(), $options: 'i' } },
            { projectname: { $regex: key.toString(), $options: 'i' } },
          ],
        };
        const architects = await this.architectsModel
          .find(options1)
          .collation({ locale: 'en', strength: 2 })
          .skip(skip)
          .limit(limit);

        const projects = await this.ProjectsModel.find(options2)
          .populate('architect_id')
          .collation({
            locale: 'en',
            strength: 2,
          })
          .skip(skip)
          .limit(limit);
        const result = [...architects, ...projects];

        return {
          status: 200,
          data: result,
          count: architects.length + projects.length,
        };
      } else {
        return { status: 200, message: 'No data available' };
      }
    } catch (error) {
      return error;
    }
  }
}

// const page = req.query.page || 1;
// const limit = 20;
// const skip = (page - 1) * limit;
// const invoice = await orderSchema
//   .find({})
//   .sort({ _id: -1 })
//   .skip(skip)
//   .limit(limit);
