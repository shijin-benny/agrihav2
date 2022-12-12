import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/userSchema';
import { architects, architectsSchema } from '../schemas/architects.schema';
import { arcprojects, arcprojectsSchema } from '../schemas/arcprojects.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: architects.name, schema: architectsSchema },
      { name: arcprojects.name, schema: arcprojectsSchema },
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
