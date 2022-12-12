import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { SearchService } from './search.service';
// import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
// import { User, UserDocument } from '../schemas/users.schema';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
// import { PaginationParams } from '../utils/paginationParams';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('find')
  async findE() {
    return this.searchService.find({}).exec();
  }

  @Get('key')
  async findAll(@Req() req: Request) {
    let options = {};
    if (req.query.l) {
      options = {
        $or: [
          { firstname: { $regex: req.query.l.toString(), $options: 'i' } },
          { lastname: { $regex: req.query.l.toString(), $options: 'i' } },
          { location: { $regex: req.query.l.toString(), $options: 'i' } },
        ],
      };
    }
    // https://agriha.herokuapp.com/search/key?l=
    const query = this.searchService.find(options);

    if (req.query.sort) {
      query.sort({ location: req.query.sort as any });
    }

    // let message: any;
    const page: number = parseInt(req.query.page as any) || 1;
    const limit = 0;
    const total = await this.searchService.count(options);

    const data = await query
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    // const data=query;
    // if (data == null) { message="no data found"}

    return {
      // query
      data,
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  }

  @Get('architect/company_names')
  getCompany_names() {
    return this.searchService.getCompanyNames();
  }

  @Get()
  searchAll(@Req() req: Request) {
    return this.searchService.searchAll(req.query.key, req.query.page);
  }
}
