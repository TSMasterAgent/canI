import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AiService } from './ai.service';

@Controller()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @EventPattern('analyze_project')
  async handleAnalyzeProject(@Payload() data: any) {
    return this.aiService.analyzeProject(data.projectId);
  }
}
