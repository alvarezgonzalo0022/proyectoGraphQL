import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {

  findOneImg(imageName: string) {
    const path = join(__dirname, '../../static/img', imageName);
    if(!existsSync(path)) throw new BadRequestException('Image not found');
    return path;
  }

  findOneCsv(csvName: string) {
    const path = join(__dirname, '../../static/csv', csvName);
    if(!existsSync(path)) throw new BadRequestException('Csv not found');
    return path;
  }

  
}
