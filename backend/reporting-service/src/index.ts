import * as amqp from 'amqplib';
import mongoose from 'mongoose';
import { Report } from './models/report.schema';

// We share the same MongoDB as Execution Service to access logs
const EXECUTION_LOG_SCHEMA = new mongoose.Schema({
  test_case_id: String,
  project_id: String,
  timestamp: Date,
  step: String,
  log_level: String,
});
const ExecutionLog = mongoose.model('ExecutionLog', EXECUTION_LOG_SCHEMA);

async function bootstrap() {
  console.log('Reporting Service starting...');

  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27018/canI';
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');

  const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5673';
  const connection = await amqp.connect(rabbitmqUrl);
  const channel = await connection.createChannel();
  
  const queue = 'reporting_queue';
  await channel.assertQueue(queue, { durable: false });

  console.log('Waiting for messages in %s', queue);
  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const { pattern, data } = JSON.parse(msg.content.toString());
      
      if (pattern === 'generate_report') {
        const { projectId } = data;
        console.log('Generating report for project:', projectId);

        try {
          // 1. Fetch all logs for this project
          const logs = await ExecutionLog.find({ project_id: projectId });
          
          // 2. Generate summary
          const summary = `Execution completed with ${logs.length} log entries.`;
          
          // 3. Save report
          await Report.create({
            project_id: projectId,
            summary,
            test_results: logs,
          });

          console.log('Report saved for project:', projectId);
          
          // Notify orchestrator (optional)
          // const orchestratorQueue = 'orchestrator_queue';
          // channel.sendToQueue(orchestratorQueue, Buffer.from(JSON.stringify({ 
          //   pattern: 'report_generated', 
          //   data: { projectId } 
          // })));

        } catch (error) {
          console.error('Error generating report:', error);
        } finally {
          channel.ack(msg);
        }
      }
    }
  });
}

bootstrap().catch(err => console.error(err));
