import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ReclamosModule } from './reclamos/reclamos.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 6432,
      database: 'ChallengeDB',
      username: 'postgres',
      password: "MySecr3tPassWord@as2",
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ReclamosModule,
    UsersModule,
    AuthModule,
    FilesModule,
    SeedModule
  ],
  providers: [AppService],
})
export class AppModule {}
