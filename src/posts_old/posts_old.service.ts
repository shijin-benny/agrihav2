import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { Posts_old, Posts_oldDocument } from 'src/schemas/posts_old.schema';
import { CreatePostsOldDto } from './dto/create-posts_old.dto';
import { UpdatePostsOldDto } from './dto/update-posts_old.dto';

@Injectable()
export class PostsOldService {

  // constructor(@InjectModel(Posts_old.name) private posts_oldModel: Model<Posts_oldDocument>) {}

  create(createPostsOldDto: CreatePostsOldDto) {
    return 'This action adds a new postsOld';
  }

  findAll() {
    // return this.posts_oldModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} postsOld`;
  }

  update(id: number, updatePostsOldDto: UpdatePostsOldDto) {
    return `This action updates a #${id} postsOld`;
  }

  remove(id: number) {
    return `This action removes a #${id} postsOld`;
  }
}
