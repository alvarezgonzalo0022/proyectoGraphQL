import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { imgFileFilter } from './helpers/imgFileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('/img/:imageName')
  findOneImg(@Param('imageName') imageName: string, @Res() res: Express.Response) {
    const path = this.filesService.findOneImg(imageName);
    return path;
  }

  @Post('/img')
  @UseInterceptors(FileInterceptor('img', {
    fileFilter: imgFileFilter,
    storage: diskStorage({
      destination: './static/img',
      filename: fileNamer
    })
  }))
  uploadReclamoIMG(
    @UploadedFile() file: Express.Multer.File
    ) {

      if(!file) return new BadRequestException('Make sure that the file is an image');

      const secureURL = `http://localhost:3002/files/img/${file.filename}`;

      return secureURL;
  }

}
