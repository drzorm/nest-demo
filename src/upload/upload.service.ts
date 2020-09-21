

import { Injectable } from '@nestjs/common';

import { Upload } from './upload.entity';

@Injectable()
export class UploadService {
  async upload(file: any): Promise<Upload> {
    return await Upload.create({ url: file });
  }
}
