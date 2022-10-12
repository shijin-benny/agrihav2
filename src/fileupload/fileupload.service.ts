import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { notEqual } from 'assert';
import { Model, ObjectId } from 'mongoose';
import { Fileupload, FileuploadDocument } from '../schemas/fileupload.schema';
import { Project, ProjectDocument } from '../schemas/project.schema';
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
      const generateUniqueID = (idLength) =>
        [...Array(idLength).keys()]
          .map((elem) => Math.random().toString(36).substr(2, 1))
          .join('');
      const files = createFileuploadDto.files.map((items: any) => {
        return {
          url: items.url,
          filename: items.filename,
          id: generateUniqueID(23),
          isDelete: false,
        };
      });
      const newFileupload = new this.fileuploadModel({
        project_id: createFileuploadDto.project_id,
        title: createFileuploadDto.title,
        files: files,
      });
      const result = await newFileupload.save().catch((error) => {
        throw new NotAcceptableException(error);
      });
      if (result) {
        console.log(result);
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

  async updatePayment_status(id) {
    try {
      await this.fileuploadModel
        .updateOne({ _id: id }, { $set: { payment_status: true } })
        .catch((error) => {
          throw new Error(error);
        });
      return { status: 200, message: 'Payment status updated' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id) {
    try {
      const response = await this.fileuploadModel.updateOne(
        { files: { $elemMatch: { id: id } } },
        { $set: { 'files.$.isDelete': true } },
      );
      if (response.modifiedCount == 1) {
        return { status: 200, message: 'Project file removed' };
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
