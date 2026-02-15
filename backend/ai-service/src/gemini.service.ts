import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async analyzeDocuments(documents: string[]): Promise<string> {
    const prompt = `Analyze the following business logic documents and provide a logic map for security testing:

${documents.join('

')}`;
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  async generateTestCases(logicMap: string): Promise<any[]> {
    const prompt = `Based on the following logic map, generate a list of security test cases focusing on authorization and business logic. Return as a JSON array of objects with 'title', 'description', 'category', and 'owasp_mapping'.

${logicMap}`;
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // In a real implementation, we would parse the JSON from the text
    return JSON.parse(text.substring(text.indexOf('['), text.lastIndexOf(']') + 1));
  }
}
