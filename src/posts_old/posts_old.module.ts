import { Module } from '@nestjs/common';
import { PostsOldService } from './posts_old.service';
import { PostsOldController } from './posts_old.controller';
import { MongooseModule } from '@nestjs/mongoose';
// import { Posts_old, Posts_oldSchema } from 'src/schemas/posts_old.schema';

@Module({
  // imports: [MongooseModule.forFeature([{ name: Posts_old.name, schema: Posts_oldSchema }])],
  controllers: [PostsOldController],
  providers: [PostsOldService]
})
export class PostsOldModule {}
