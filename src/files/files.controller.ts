import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from './helpers/index';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    ) {}

  @Get('/:imageName')
  findOne(@Res() res: Response, @Param('imageName') imageName: string) {

    const path = this.filesService.getStaticProductImage(imageName);

    res.sendFile(path)
  }

  @Post('/reclamo')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }))
  uploadProductImage(@UploadedFile() file: Express.Multer.File, ) {    

    if(!file) throw new BadRequestException(`Archivo requerido`)

    const secureUrl = `http://localhost:3000/files/${file.filename}`;

    return { secureUrl };
  }
  
}
