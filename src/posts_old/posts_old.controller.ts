import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { PostsOldService } from './posts_old.service';
import { CreatePostsOldDto } from './dto/create-posts_old.dto';
import { UpdatePostsOldDto } from './dto/update-posts_old.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts-old')
export class PostsOldController {
  constructor(private readonly postsOldService: PostsOldService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createPostsOldDto: CreatePostsOldDto) {
    return this.postsOldService.create(createPostsOldDto);
  }

  @Get()
  // @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.postsOldService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.postsOldService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updatePostsOldDto: UpdatePostsOldDto) {
    return this.postsOldService.update(+id, updatePostsOldDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.postsOldService.remove(+id);
  }
}
