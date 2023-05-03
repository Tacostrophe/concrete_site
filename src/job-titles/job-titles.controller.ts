import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateJobTitleDto } from './dto/create-job-title.dto';
import { JobTitlesService } from './job-titles.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobTitle } from './job-titles.model';

@ApiTags('должности')
@Controller('job-titles')
export class JobTitlesController {
  constructor(private jobTitlesService: JobTitlesService) {}

  @ApiOperation({ summary: 'создание должности' })
  @ApiResponse({ status: 200, type: JobTitle })
  @Post()
  create(@Body() jobTitleDto: CreateJobTitleDto) {
    return this.jobTitlesService.createJobTitle(jobTitleDto);
  }

  @ApiOperation({ summary: 'получение списка всех должностей' })
  @ApiResponse({ status: 200, type: [JobTitle] })
  @Get()
  list() {
    return this.jobTitlesService.listJobTitles();
  }
}
