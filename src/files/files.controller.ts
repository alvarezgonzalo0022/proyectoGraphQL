import { Controller, Get, Post, Param, UploadedFile, UseInterceptors, BadRequestException, Res, ParseIntPipe } from '@nestjs/common';
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

  @Post('/img/:id')
  @UseInterceptors(FileInterceptor('img', {
    fileFilter: imgFileFilter,
    storage: diskStorage({
      destination: './static/img',
      filename: fileNamer
    })
  }))
  uploadReclamoIMG(
    @Param('nro', ParseIntPipe) nro: number,
    @UploadedFile() file: Express.Multer.File
    ) {
      this.filesService.saveImg(file, nro)
  }

}
