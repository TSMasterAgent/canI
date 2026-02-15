import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORCHESTRATOR_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5673'],
          queue: 'orchestrator_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [AiService],
  controllers: [AiController],
})
export class AiModule {}
