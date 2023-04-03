import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';
import { ReclamosService } from 'src/reclamos/reclamos.service';

@Injectable()
export class FilesService {

  constructor(
    private readonly reclamoService: ReclamosService
  ) {}

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

  saveImg(file: Express.Multer.File, nro: number) {
    
    if(!file) return new BadRequestException('Make sure that the file is an image');

    const secureURL = `http://localhost:3002/files/img/${file.filename}`;

    this.reclamoService.addImgToReclamo(nro, secureURL);

    return secureURL;

  }

  
}
