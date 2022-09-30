import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { MailService } from 'src/Mailer/mailer.service';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
import { User, UserDocument } from 'src/schemas/userSchema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    private MailerService: MailService,
  ) {}

  async findOne(id: ObjectId) {
    const userData = await this.userModel
      .findById(id)
      .populate('registered_id');
    return { status: 200, userData: userData };
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto) {
    // if(updateUserDto.name || updateUserDto.email)
    await this.userModel
      .updateOne({ _id: id }, { $set: updateUserDto })
      .catch((err) => {
        throw new Error(err);
      });

    return { status: 200, message: 'User profile updated successfully' };
  }

  async projectAdded_mail(userId, projectId) {
    try {
      console.log(userId);
      const project = await this.projectModel.findOne({ _id: projectId.id });
      const userDta = await (
        await this.userModel.findOne({ _id: userId })
      ).populate('registered_id');
      if (project && userDta) {
        this.MailerService.projectAdded_mail(project, userDta);
        return { status: 200, message: 'Mail sended successfully' };
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
}
