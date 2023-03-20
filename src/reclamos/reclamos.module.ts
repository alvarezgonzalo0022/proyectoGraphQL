import { Module } from '@nestjs/common';
import { ReclamosService } from './reclamos.service';
import { ReclamosResolver } from './reclamos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reclamo } from './entity/reclamo.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reclamo, User]), UsersModule],
  providers: [ReclamosService, ReclamosResolver]
})
export class ReclamosModule {}
