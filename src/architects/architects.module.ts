import { Module } from '@nestjs/common';
import { ArchitectsService } from './architects.service';
import { ArchitectsController } from './architects.controller';
import { User_old, User_oldSchema } from '../schemas/user_old.schema';
import { MongooseModule } from '@nestjs/mongoose';
// import { Posts_old, Posts_oldSchema } from '../schemas/posts_old.schema';
import { architects, architectsSchema } from '../schemas/architects.schema';
import { register, registerSchema } from '../schemas/register.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User_old.name, schema: User_oldSchema },
      // { name: Posts_old.name, schema: Posts_oldSchema },
      { name: architects.name, schema: architectsSchema },
      { name: register.name, schema: registerSchema },
    ]),
  ],
  controllers: [ArchitectsController],
  providers: [ArchitectsService],
})
export class ArchitectsModule {}
