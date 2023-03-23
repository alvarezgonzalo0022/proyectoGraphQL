import { Module } from '@nestjs/common';
import { ReclamosService } from './reclamos.service';
import { ReclamosResolver } from './reclamos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reclamo } from './entity/reclamo.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { DetalleCompra } from './entity/detalleDeCompra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reclamo, User, DetalleCompra]), UsersModule],
  providers: [ReclamosService, ReclamosResolver],
  exports: [TypeOrmModule]
})
export class ReclamosModule {}
