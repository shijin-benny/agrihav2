import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { notEqual } from 'assert';
import { Model, ObjectId } from 'mongoose';
import { Fileupload, FileuploadDocument } from 'src/schemas/fileupload.schema';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
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
      const newFileupload = new this.fileuploadModel(createFileuploadDto);
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

  update(id: number, updateFileuploadDto: UpdateFileuploadDto) {
    return `This action updates a #${id} fileupload`;
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
