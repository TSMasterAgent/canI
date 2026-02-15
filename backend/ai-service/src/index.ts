import * as amqp from 'amqplib';
import mongoose from 'mongoose';
import { GeminiService } from './gemini.service';
import { GeminiInteraction } from './models/gemini-interaction.schema';

async function bootstrap() {
  console.log('AI Service starting...');

  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27018/canI';
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');

  const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
  const connection = await amqp.connect(rabbitmqUrl);
  const channel = await connection.createChannel();
  
  const queue = 'ai_analysis_queue';
  await channel.assertQueue(queue, { durable: false });

  const geminiService = new GeminiService(process.env.GEMINI_API_KEY || '');

  console.log('Waiting for messages in %s', queue);
  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const content = JSON.parse(msg.content.toString());
      console.log('Received analysis request for project:', content.projectId);

      try {
        const logicMap = await geminiService.analyzeDocuments(content.documents);
        
        await GeminiInteraction.create({
          project_id: content.projectId,
          prompt: 'Analyze documents',
          response: logicMap,
          context_type: 'ANALYSIS',
        });

        const testCases = await geminiService.generateTestCases(logicMap);

        // Send back to orchestrator or update project service
        console.log('Generated %d test cases', testCases.length);
        
        channel.ack(msg);
      } catch (error) {
        console.error('Error processing analysis:', error);
        channel.nack(msg);
      }
    }
  });
}

bootstrap().catch(err => console.error(err));
