import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrchestratorService } from './orchestrator.service';

@Controller()
export class OrchestratorController {
  constructor(private readonly orchestratorService: OrchestratorService) {}

  @EventPattern('project_created')
  async handleProjectCreated(@Payload() data: any) {
    return this.orchestratorService.handleProjectCreated(data);
  }

  @EventPattern('test_cases_generated')
  async handleTestCasesGenerated(@Payload() data: any) {
    return this.orchestratorService.handleTestCasesGenerated(data);
  }

  @EventPattern('execution_completed')
  async handleExecutionCompleted(@Payload() data: any) {
    return this.orchestratorService.handleExecutionCompleted(data);
  }

  @EventPattern('execute_tests')
  async handleExecuteTests(@Payload() data: { projectId: string; testCaseIds: string[] }) {
    return this.orchestratorService.startExecution(data.projectId, data.testCaseIds);
  }
}
