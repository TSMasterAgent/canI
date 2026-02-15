import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Project } from '../entities/project.entity';
import { TargetCredential } from '../entities/target-credential.entity';
import { TestCase } from '../entities/test-case.entity';
import { IngestedDocument, IngestedDocumentSchema } from '../entities/ingested-document.schema';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, TargetCredential, TestCase]),
    MongooseModule.forFeature([{ name: IngestedDocument.name, schema: IngestedDocumentSchema }]),
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
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
