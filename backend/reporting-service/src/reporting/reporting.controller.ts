import { Controller, Get, Param } from '@nestjs/common';
import { ReportingService } from './reporting.service';

@Controller('reporting')
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Get('project/:projectId')
  async getProjectReport(@Param('projectId') projectId: string) {
    return this.reportingService.generateReport(projectId);
  }

  @Get('test-case/:testCaseId')
  async getTestCaseLogs(@Param('testCaseId') testCaseId: string) {
    return this.reportingService.getLogsByTestCase(testCaseId);
  }
}
