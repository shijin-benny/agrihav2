import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import {
  buildingdetails_tb,
  buildingdetails_tbDocument,
} from '../schemas/buildingdetails.schema';
import { CreateProjectRequirementDto } from './dto/create-project_requirement.dto';
import { UpdateProjectRequirementDto } from './dto/update-project_requirement.dto';

@Injectable()
export class ProjectRequirementsService {
  constructor(
    @InjectModel(buildingdetails_tb.name)
    private buildingdetailsModel: Model<buildingdetails_tbDocument>,
  ) {}

  async create(
    createProjectRequirementDto: CreateProjectRequirementDto,
    userId: any,
  ) {
    createProjectRequirementDto.creator = new mongoose.Types.ObjectId(userId);
    console.log(createProjectRequirementDto);
    const datasave = await new this.buildingdetailsModel(
      createProjectRequirementDto,
    ).save();

    return { status: 200, data: datasave, message: 'project details added' };
  }

  async findAll(userId) {
    const id = new mongoose.Types.ObjectId(userId);
    const projects = await this.buildingdetailsModel
      .find({ creator: id })
      .populate('project');
    if (!projects) {
      throw new NotFoundException('user not added any projects');
    }
    return {
      status: 200,
      message: 'user projects ',
      projects: projects,
    };
  }

  async update(
    id: ObjectId,
    updateProjectRequirementDto: UpdateProjectRequirementDto,
  ) {
    const user = await this.buildingdetailsModel
      .findByIdAndUpdate(id, updateProjectRequirementDto)
      .setOptions({ overwrite: true, new: true });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  remove(id: ObjectId) {
    return this.buildingdetailsModel.findByIdAndDelete(id).then(() => {
      return 'deleted';
    });
  }
}
