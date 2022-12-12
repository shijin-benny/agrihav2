import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { notEqual } from 'assert';
import { Model, ObjectId } from 'mongoose';
import {
  Userfileupload,
  UserfileuploadDocument,
} from '../schemas/userfileupload.schema';
import { Fileupload, FileuploadDocument } from '../schemas/fileupload.schema';
import { Project, ProjectDocument } from '../schemas/projects.schema';
import {
  CreateFileuploadDto,
  CreateUserFileuploadDto,
} from './dto/create-fileupload.dto';
import { addfilesDto } from './dto/update-fileupload.dto';

@Injectable()
export class FileuploadService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(Fileupload.name)
    private fileuploadModel: Model<FileuploadDocument>,
    @InjectModel(Userfileupload.name)
    private useruploadModel: Model<UserfileuploadDocument>,
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

  async findAllfiles() {
    try {
      const Allfiles = await this.fileuploadModel.find({});
      return { status: 200, files: Allfiles };
    } catch (error) {
      return error;
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

  async addfiles(id, addfileDta: addfilesDto) {
    try {
      const newfile = {
        filename: addfileDta.filename,
        url: addfileDta.url,
        isDelete: false,
        id:
          Date.now() +
          Math.floor((1 + Math.random()) * 1000000)
            .toString(16)
            .substring(1),
      };
      const response = await this.fileuploadModel.updateOne(
        { _id: id },
        { $push: { files: newfile } },
      );
      if (response.matchedCount === 1) {
        return { status: 200, message: 'New file added' };
      } else {
        return { status: 202, message: 'Something went wrong!,Try again' };
      }
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

  async newUserFile(newUserFileDta: any, Jwtdta) {
    try {
      newUserFileDta.user_id = Jwtdta.id;
      const IsUserfile = await this.useruploadModel.findOne({
        $and: [
          { project_id: newUserFileDta.project_id },
          { user_id: Jwtdta.id },
        ],
      });
      if (IsUserfile) {
        throw new ConflictException('Userfile already exists');
      }
      const response = await this.useruploadModel
        .create(newUserFileDta)
        .catch((error) => {
          throw new BadRequestException(error);
        });
      return { status: 200, message: 'Userfile created' };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async findUserFile(Jwtdta) {
    try {
      const IsUserfile = await this.useruploadModel.find({
        user_id: Jwtdta.id,
      });
      if (IsUserfile) {
        return { status: 200, userFile: IsUserfile };
      } else {
        throw new NotFoundException('user files not found');
      }
    } catch (error) {
      return error;
    }
  }
}
