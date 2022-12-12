import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from '../schemas/userSchema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // async create(createUserDto: CreateUserDto) {
  //   const createdUser = new this.userModel(createUserDto);
  //   return createdUser.save();
  // }

  //or

  async create(createUserDto: CreateUserDto): Promise<User> {
    return new this.userModel(createUserDto).save();
  }

  //to get the number of users registered
  async getUserCount() {
    return this.userModel.countDocuments().exec();
  }

  //find all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: ObjectId): Promise<User> {
    return this.userModel.findById({ _id: id }).exec();
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto)
      .setOptions({ overwrite: true, new: true });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  remove(id: ObjectId) {
    return this.userModel.findByIdAndRemove(id).exec();
  }
}
