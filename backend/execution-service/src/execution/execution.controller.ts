import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ExecutionService } from './execution.service';

@Controller()
export class ExecutionController {
  constructor(private readonly executionService: ExecutionService) {}

  @EventPattern('execute_tests')
  async handleExecuteTests(@Payload() data: { projectId: string; testCaseIds: string[] }) {
    for (const testCaseId of data.testCaseIds) {
      await this.executionService.executeTest(data.projectId, testCaseId);
    }
  }
}
