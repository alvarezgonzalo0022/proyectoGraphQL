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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DOCKER_DB_HOST,
      port: +process.env.DOCKER_DB_PORT,
      database: process.env.DOCKER_DB_NAME,
      username: process.env.DOCKER_DB_USERNAME,
      password: process.env.DOCKER_DB_PASSWORD,
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
