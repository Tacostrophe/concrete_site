import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JobTitlesService } from './job-titles.service';
import { JobTitle } from './job-titles.model';
import { JobTitlesController } from './job-titles.controller';

@Module({
  controllers: [JobTitlesController],
  providers: [JobTitlesService],
  imports: [SequelizeModule.forFeature([JobTitle])],
  exports: [],
})
export class JobTitlesModule {}
