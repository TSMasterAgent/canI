import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrchestratorService } from './orchestrator.service';
import { OrchestratorController } from './orchestrator.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AI_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5673'],
          queue: 'ai_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'EXECUTION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5673'],
          queue: 'execution_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'PROJECT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5673'],
          queue: 'project_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'REPORTING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5673'],
          queue: 'reporting_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [OrchestratorService],
  controllers: [OrchestratorController],
})
export class OrchestratorModule {}
