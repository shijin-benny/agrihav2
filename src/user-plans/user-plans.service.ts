import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { CreateUserPlanDto } from './dto/create-user-plan.dto';
import { UpdateUserPlanDto } from './dto/update-user-plan.dto';
import {
  Project_requirement,
  Project_requirementDocument,
} from '../schemas/project_requirements.schema';

@Injectable()
export class UserPlansService {
  constructor(
    @InjectModel(Project_requirement.name)
    private projectrequirementsModel: Model<Project_requirementDocument>,
  ) {}

  async create(createUserPlanDto: CreateUserPlanDto, userId: any) {
    createUserPlanDto.creator = new mongoose.Types.ObjectId(userId);
    console.log(createUserPlanDto);
    const datasave = await new this.projectrequirementsModel(
      createUserPlanDto,
    ).save();

    return { status: 200, data: datasave, message: 'project details added' };
  }

  async findAll(userId) {
    const id = new mongoose.Types.ObjectId(userId);
    const projects = await this.projectrequirementsModel
      .find({ creator: id })
      .populate('project_id')
      .populate('plan_id');
    if (!projects) {
      throw new NotFoundException('user not added any projects');
    }
    return {
      status: 200,
      message: 'user plans ',
      projects: projects,
    };
  }

  async update(id: ObjectId, updateUserPlanDto: UpdateUserPlanDto) {
    const user = await this.projectrequirementsModel.findByIdAndUpdate(id, {
      $set: {
        creator: updateUserPlanDto.creator,
        project_id: updateUserPlanDto.project_id,
        plan_id: updateUserPlanDto.plan_id,
      },
      $push: { requirements_list: updateUserPlanDto.requirements_list },
    });

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  remove(id: ObjectId) {
    return this.projectrequirementsModel.findByIdAndDelete(id).then(() => {
      return 'deleted';
    });
  }
}
