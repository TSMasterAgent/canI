import * as amqp from 'amqplib';
import mongoose from 'mongoose';
import { chromium } from 'playwright';
import { ExecutionLog } from './models/execution-log.schema';

async function bootstrap() {
  console.log('Execution Service starting...');

  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27018/canI';
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');

  const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5673';
  const connection = await amqp.connect(rabbitmqUrl);
  const channel = await connection.createChannel();
  
  const inputQueue = 'execution_queue';
  await channel.assertQueue(inputQueue, { durable: false });

  const orchestratorQueue = 'orchestrator_queue';
  await channel.assertQueue(orchestratorQueue, { durable: false });

  const projectQueue = 'project_queue';
  await channel.assertQueue(projectQueue, { durable: false });

  console.log('Waiting for messages in %s', inputQueue);
  channel.consume(inputQueue, async (msg) => {
    if (msg !== null) {
      const { pattern, data } = JSON.parse(msg.content.toString());
      
      if (pattern === 'execute_tests') {
        const { projectId, testCaseIds } = data;
        console.log('Received execution request for project:', projectId);

        // Notify Project Service that we are logging (mock)
        const logMsg = {
          pattern: 'project_log',
          data: { projectId, message: 'Execution started', level: 'INFO' }
        };
        // channel.sendToQueue(projectQueue, Buffer.from(JSON.stringify(logMsg)));

        const browser = await chromium.launch({ headless: true });
        try {
          const context = await browser.newContext();
          const page = await context.newPage();

          for (const testCaseId of testCaseIds) {
            console.log('Executing test case:', testCaseId);
            
            await ExecutionLog.create({
              test_case_id: testCaseId,
              project_id: projectId,
              step: 'START_TEST',
              log_level: 'INFO',
            });

            // In a real scenario, we'd fetch the test case details and target URL
            // For now, we simulate success
            await ExecutionLog.create({
              test_case_id: testCaseId,
              project_id: projectId,
              step: 'TEST_COMPLETED',
              log_level: 'INFO',
            });
          }

          // Notify orchestrator
          const completionMsg = {
            pattern: 'execution_completed',
            data: { projectId, status: 'COMPLETED' }
          };
          channel.sendToQueue(orchestratorQueue, Buffer.from(JSON.stringify(completionMsg)));
          console.log('Execution completed for project:', projectId);

        } catch (error) {
          console.error('Error during execution:', error);
        } finally {
          await browser.close();
          channel.ack(msg);
        }
      }
    }
  });
}

bootstrap().catch(err => console.error(err));
