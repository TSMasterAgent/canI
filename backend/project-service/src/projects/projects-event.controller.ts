import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProjectsService } from './projects.service';

@Controller()
export class ProjectsEventController {
  constructor(private readonly projectsService: ProjectsService) {}

  @EventPattern('update_project_status')
  async handleUpdateStatus(@Payload() data: { projectId: string; status: any }) {
    console.log('Projects Service: Updating status', data);
    return this.projectsService.updateStatus(data.projectId, data.status);
  }

  @EventPattern('save_test_cases')
  async handleSaveTestCases(@Payload() data: { projectId: string; testCases: any[] }) {
    console.log('Projects Service: Saving test cases', data.projectId);
    return this.projectsService.saveTestCases(data.projectId, data.testCases);
  }
}
