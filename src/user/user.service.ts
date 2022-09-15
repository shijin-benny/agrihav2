import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from 'src/schemas/userSchema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(id: ObjectId) {
    const userData = await this.userModel
      .findById(id)
      .populate('registered_id');
    return { status: 200, userData: userData };
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto) {
    await this.userModel
      .updateOne({ _id: id }, { $set: updateUserDto })
      .catch((err) => {
        throw new Error(err);
      });

    return { status: 200, message: 'User profile updated successfully' };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
