import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { register, registerDocument } from '../schemas/register.schema';
import { MailService } from '../Mailer/mailer.service';
import { Fileupload, FileuploadDocument } from '../schemas/fileupload.schema';
import { Project, ProjectDocument } from '../schemas/projects.schema';
import { User, UserDocument } from '../schemas/userSchema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(Fileupload.name)
    private projectFileModel: Model<FileuploadDocument>,
    private MailerService: MailService,
    @InjectModel(register.name) private registerModel: Model<registerDocument>,
  ) {}

  async findOne(userId) {
    try {
      const userData = await this.userModel
        .findById(userId.id)
        .populate('registered_id');
      return { status: 200, userData: userData };
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto) {
    try {
      await this.userModel
        .updateOne({ _id: id }, { $set: updateUserDto })
        .catch((err) => {
          throw new Error(err);
        });

      return { status: 200, message: 'User profile updated successfully' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async projectAdded_mail(userId, projectId) {
    try {
      console.log(userId);
      console.log(projectId);
      const project = await this.projectModel.findOne({ _id: projectId.id });
      const userDta = await (
        await this.userModel.findOne({ _id: userId })
      ).populate('registered_id');
      if (project && userDta) {
        this.MailerService.projectAdded_mail(project, userDta);
        return { status: 200, message: 'Mail sended successfully' };
      } else {
        throw new NotFoundException('project id or user id not found');
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async userProject_files(id) {
    try {
      const projectFiles = await this.projectFileModel.find({
        project_id: id,
      });
      if (projectFiles) {
        return {
          status: 200,
          message: "User's project files",
          data: projectFiles,
        };
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAllUsers() {
    try {
      const userlist = await this.registerModel
        .find({})
        .sort({ createdAt: -1 })
        .exec()
        .catch((error) => {
          throw new NotFoundException(error);
        });
      return { status: 200, data: userlist };
    } catch (error) {
      return error;
    }
  }
}
