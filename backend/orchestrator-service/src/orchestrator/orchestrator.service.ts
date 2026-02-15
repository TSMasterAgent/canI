import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrchestratorService {
  constructor(
    @Inject('AI_SERVICE') private aiClient: ClientProxy,
    @Inject('EXECUTION_SERVICE') private executionClient: ClientProxy,
  ) {}

  async handleProjectCreated(data: any) {
    console.log('Orchestrator: Project Created', data);
    // Trigger AI Analysis
    this.aiClient.emit('analyze_project', { projectId: data.projectId });
  }

  async handleTestCasesGenerated(data: any) {
    console.log('Orchestrator: Test Cases Generated', data);
    // Wait for operator approval (this would normally be handled by a status change in DB)
  }

  async handleExecutionCompleted(data: any) {
    console.log('Orchestrator: Execution Completed', data);
    // Trigger Reporting
  }

  async startExecution(projectId: string, testCaseIds: string[]) {
    this.executionClient.emit('execute_tests', { projectId, testCaseIds });
  }
}
