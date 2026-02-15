import { Injectable, Inject } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(
    private configService: ConfigService,
    @Inject('ORCHESTRATOR_SERVICE') private orchestratorClient: ClientProxy,
  ) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined in environment');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
  }

  async analyzeProject(projectId: string) {
    console.log('AI Service: Analyzing project', projectId);
    
    // In a real scenario, we'd fetch the documents from MongoDB here.
    // For now, let's simulate a call to Gemini.

    const prompt = `Analyze the business logic for project ${projectId}. Generate 5 test cases for authorization and business logic vulnerabilities (e.g., IDOR, role escalation). Return as JSON.`;
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('Gemini response:', text);

      // Emit event back to orchestrator with generated test cases
      this.orchestratorClient.emit('test_cases_generated', {
        projectId,
        testCases: [{ title: 'IDOR on /user/profile', description: 'Test if user A can access user B profile', category: 'IDOR' }], // Mock for now
      });

    } catch (error) {
      console.error('Gemini API error:', error);
    }
  }
}
