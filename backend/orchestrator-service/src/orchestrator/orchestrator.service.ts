import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrchestratorService {
  constructor(
    @Inject('AI_SERVICE') private aiClient: ClientProxy,
    @Inject('EXECUTION_SERVICE') private executionClient: ClientProxy,
    @Inject('PROJECT_SERVICE') private projectClient: ClientProxy,
    @Inject('REPORTING_SERVICE') private reportingClient: ClientProxy,
  ) {}

  async handleProjectCreated(data: any) {
    console.log('Orchestrator: Project Created, starting analysis', data.projectId);
    
    // 1. Update status to ANALYZING
    this.projectClient.emit('update_project_status', { 
      projectId: data.projectId, 
      status: 'ANALYZING' 
    });

    // 2. Trigger AI Analysis
    this.aiClient.emit('analyze_project', { projectId: data.projectId });
  }

  async handleTestCasesGenerated(data: { projectId: string; testCases: any[] }) {
    console.log('Orchestrator: Test Cases Generated for project', data.projectId);
    
    // 1. Save test cases to Project Service
    this.projectClient.emit('save_test_cases', { 
      projectId: data.projectId, 
      testCases: data.testCases 
    });

    // 2. Update status to PENDING_APPROVAL
    this.projectClient.emit('update_project_status', { 
      projectId: data.projectId, 
      status: 'PENDING_APPROVAL' 
    });
  }

  async handleExecutionStarted(data: { projectId: string }) {
    this.projectClient.emit('update_project_status', { 
      projectId: data.projectId, 
      status: 'EXECUTING' 
    });
  }

  async handleExecutionCompleted(data: { projectId: string }) {
    console.log('Orchestrator: Execution Completed', data.projectId);
    
    // 1. Update status to COMPLETED
    this.projectClient.emit('update_project_status', { 
      projectId: data.projectId, 
      status: 'COMPLETED' 
    });

    // 2. Trigger Reporting
    this.reportingClient.emit('generate_report', { projectId: data.projectId });
  }

  async startExecution(projectId: string, testCaseIds: string[]) {
    // This is called when operator clicks "Execute" in UI (via Project Service event)
    this.handleExecutionStarted({ projectId });
    this.executionClient.emit('execute_tests', { projectId, testCaseIds });
  }
}
