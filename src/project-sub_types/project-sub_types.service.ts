import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  projectSubType,
  projectSubTypeDocument,
} from '../schemas/projectSub_type.schema';
import { CreateProjectSubTypeDto } from './dto/create-project-sub_type.dto';
import { UpdateProjectSubTypeDto } from './dto/update-project-sub_type.dto';

@Injectable()
export class ProjectSubTypesService {
  constructor(
    @InjectModel(projectSubType.name)
    private projectSubTypeModel: Model<projectSubTypeDocument>,
  ) {}

  async create(createProjectSubTypeDto: CreateProjectSubTypeDto) {
    console.log(createProjectSubTypeDto);
    const datasave = await new this.projectSubTypeModel(
      createProjectSubTypeDto,
    ).save();

    return { status: 200, data: datasave, message: 'project subtype added' };
  }

  async findAll() {
    const projecttype = await this.projectSubTypeModel.find().exec();

    return {
      status: 200,
      message: 'project types ',
      projecttype: projecttype,
    };
  }

  async findOne(id: ObjectId) {
    const projecttype = await this.projectSubTypeModel
      .find({ projectType_id: id })
      .populate('projectType_id');

    return {
      status: 200,
      message: 'project single types ',
      projecttype: projecttype,
    };
  }

  async update(id: ObjectId, updateProjectSubTypeDto: UpdateProjectSubTypeDto) {
    const user = await this.projectSubTypeModel.findByIdAndUpdate(
      id,
      updateProjectSubTypeDto,
    );
    if (!user) {
      throw new NotFoundException();
    }
    return { status: 200, user };
  }

  remove(id: ObjectId) {
    return this.projectSubTypeModel.findByIdAndDelete(id).then(() => {
      return 'project type deleted';
    });
  }
}
