import { Module } from '@nestjs/common';
import { ReclamosService } from './reclamos.service';
import { ReclamosResolver } from './reclamos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reclamo } from './entity/reclamo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reclamo])],
  providers: [ReclamosService, ReclamosResolver]
})
export class ReclamosModule {}
