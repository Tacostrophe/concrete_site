import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JobTitle } from './job-titles.model';
import { CreateJobTitleDto } from './dto/create-job-title.dto';

@Injectable()
export class JobTitlesService {
  constructor(
    @InjectModel(JobTitle) private jobTitleRepository: typeof JobTitle,
  ) {}

  async createJobTitle(dto: CreateJobTitleDto) {
    const jobTitle = await this.jobTitleRepository.create(dto);
    return jobTitle;
  }

  async listJobTitles() {
    const jobTitles = await this.jobTitleRepository.findAll();
    return jobTitles;
  }
}
