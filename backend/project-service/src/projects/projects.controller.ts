import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll() {
    return this.projectsService.findAll();
  }

  @Post()
  async create(@Body() body: any) {
    return this.projectsService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Post(':id/documents')
  async ingestDocument(@Param('id') id: string, @Body() body: any) {
    return this.projectsService.ingestDocument(id, body);
  }

  @Post(':id/credentials')
  async addCredentials(@Param('id') id: string, @Body() body: any) {
    return this.projectsService.addCredentials(id, body);
  }

  @Get(':id/test-cases')
  async getTestCases(@Param('id') id: string) {
    return this.projectsService.getTestCases(id);
  }
}
