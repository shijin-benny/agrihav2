import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { notEqual } from 'assert';
import { Model, ObjectId } from 'mongoose';
import { Fileupload, FileuploadDocument } from '../schemas/fileupload.schema';
import { Project, ProjectDocument } from '../schemas/projects.schema';
import { CreateFileuploadDto } from './dto/create-fileupload.dto';
import { UpdateFileuploadDto } from './dto/update-fileupload.dto';

@Injectable()
export class FileuploadService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(Fileupload.name)
    private fileuploadModel: Model<FileuploadDocument>,
  ) {}

  async create(createFileuploadDto: CreateFileuploadDto) {
    try {
      const IsArrayfiles = createFileuploadDto.files.map((items) => {
        Object.assign(items, {
          isDelete: false,
          id:
            Date.now() +
            Math.floor((1 + Math.random()) * 1000000)
              .toString(16)
              .substring(1),
        });
        return items;
      });
      const newFileupload = new this.fileuploadModel({
        title: createFileuploadDto.title,
        project_id: createFileuploadDto.project_id,
        files: IsArrayfiles,
      });
      const result = await newFileupload.save().catch((error) => {
        throw new NotAcceptableException(error);
      });
      if (result) {
        return { status: 200, message: 'file uploaded successfully' };
      }
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findDta(id) {
    try {
      const uploaded_data = await this.fileuploadModel.find({
        project_id: id,
      });
      return { status: 200, data: uploaded_data };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findArchitects_project(id) {
    try {
      const projects = await this.projectModel.find({ architect_id: id });
      return {
        status: 200,
        message: 'Architect projects',
        projectDta: projects,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(id: string) {
    try {
      const response = await this.fileuploadModel
        .updateOne({ _id: id }, { $set: { payment_status: true } })
        .catch((error) => {
          throw new NotAcceptableException(error);
        });
      return { status: 200, message: 'Payment status updated' };
    } catch (error) {
      return error;
    }
  }

  async removeFile(_id, filesId) {
    try {
      const response = await this.fileuploadModel.updateOne(
        { _id: _id, 'files.id': filesId },
        { $set: { 'files.$.isDelete': true } },
      );
      if (response.matchedCount === 1) {
        return { status: 200, message: 'File removed' };
      } else {
        return { status: 202, message: 'Something went wrong!,Try again' };
      }
    } catch (error) {
      return error;
    }
  }

  async remove(id) {
    try {
      const response = await this.fileuploadModel.updateOne(
        { _id: id },
        { $set: { status: false } },
      );
      if (response.modifiedCount == 1) {
        return { status: 200, message: 'Project file removed' };
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
