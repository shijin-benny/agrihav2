import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { ObjectId, Schema } from 'mongoose';
import { CreateFileuploadDto } from './create-fileupload.dto';

export class UpdateFileuploadDto extends PartialType(CreateFileuploadDto) {}
