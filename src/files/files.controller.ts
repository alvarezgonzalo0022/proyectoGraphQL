import { Controller, Get, Post, Param, UploadedFile, UseInterceptors, Res, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { imgFileFilter } from './helpers/imgFileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('/img/:imageName')
  findOneImg(@Param('imageName') imageName: string, @Res() res: Express.Response) {
    const path = this.filesService.findOneImg(imageName);
    return path;
  }

  @Post('/img/:nro')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(FileInterceptor('img', {
    fileFilter: imgFileFilter,
    storage: diskStorage({
      destination: './static/img',
      filename: fileNamer
    })
  }))
  uploadReclamoIMG(
    @Param('nro', ParseIntPipe) nro: number,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User
    ) {
      this.filesService.saveImg(file, nro, user)
  }

}
