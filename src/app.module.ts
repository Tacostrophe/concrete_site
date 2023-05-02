import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
// import { User } from './users/users.model';
import { JobTitlesController } from './job-titles/job-titles.controller';
import { JobTitlesModule } from './job-titles/job-titles.module';
import { JobTitle } from './job-titles/job-titles.model';

@Module({
  controllers: [JobTitlesController],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST ?? 'localhost',
      port: +(process.env.POSTGRES_PORT ?? 5432),
      username: process.env.POSTGRES_USER ?? 'postgres',
      password: process.env.POSTGRES_PASSWORD ?? 'root',
      database: process.env.POSTGRES_DB ?? 'concrete_site',
      models: [
        // User,
        JobTitle,
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    JobTitlesModule,
  ],
})
export class AppModule {}
