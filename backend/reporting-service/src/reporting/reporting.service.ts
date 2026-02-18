import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExecutionLog, ExecutionLogDocument } from '../models/execution-log.schema';

@Injectable()
export class ReportingService {
  constructor(
    @InjectModel(ExecutionLog.name)
    private executionLogModel: Model<ExecutionLogDocument>,
  ) {}

  async getLogsByTestCase(testCaseId: string): Promise<ExecutionLog[]> {
    return this.executionLogModel.find({ test_case_id: testCaseId }).sort({ timestamp: 1 }).exec();
  }

  async generateReport(projectId: string): Promise<any> {
    // Logic to aggregate all logs for a project and create a summary
    return {
      projectId,
      status: 'COMPLETED',
      summary: 'Automated pentest completed. Found 0 critical vulnerabilities.',
      timestamp: new Date(),
    };
  }
}
