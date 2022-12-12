import { PartialType } from '@nestjs/mapped-types';
import { CreatePostsOldDto } from './create-posts_old.dto';

export class UpdatePostsOldDto extends PartialType(CreatePostsOldDto) {}
