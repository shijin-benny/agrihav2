import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  projectType,
  projectTypeDocument,
} from '../schemas/projectType.schema';
import { CreateProjectTypeDto } from './dto/create-project_type.dto';
import { UpdateProjectTypeDto } from './dto/update-project_type.dto';

@Injectable()
export class ProjectTypesService {
  constructor(
    @InjectModel(projectType.name)
    private projectTypeModel: Model<projectTypeDocument>,
  ) {}

  async create(createProjectTypeDto: CreateProjectTypeDto) {
    console.log(createProjectTypeDto);
    const datasave = await new this.projectTypeModel(
      createProjectTypeDto,
    ).save();

    return { status: 200, data: datasave, message: 'project type added' };
  }

  async findAll() {
    const projecttype = await this.projectTypeModel.find().exec();

    return {
      status: 200,
      message: 'project types ',
      projecttype: projecttype,
    };
  }

  async findOne(id: ObjectId) {
    const projecttype = await this.projectTypeModel.findOne({ _id: id }).exec();

    return {
      status: 200,
      message: 'single project type',
      projecttype: projecttype,
    };
  }

  async update(id: ObjectId, updateProjectTypeDto: UpdateProjectTypeDto) {
    const user = await this.projectTypeModel.findByIdAndUpdate(
      id,
      updateProjectTypeDto,
    );
    if (!user) {
      throw new NotFoundException();
    }
    return { status: 200, user };
  }

  remove(id: ObjectId) {
    return this.projectTypeModel.findByIdAndDelete(id).then(() => {
      return 'project type deleted';
    });
  }
}
