import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ReclamosModule } from 'src/reclamos/reclamos.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [ReclamosModule]
})
export class FilesModule {}
