import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { UsersModule } from 'src/users/users.module';
import { ReclamosModule } from 'src/reclamos/reclamos.module';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [UsersModule, ReclamosModule]
})
export class SeedModule {}
