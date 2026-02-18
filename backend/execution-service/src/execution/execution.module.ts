import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExecutionService } from './execution.service';
import { ExecutionController } from './execution.controller';
import { ExecutionLog, ExecutionLogSchema } from '../models/execution-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ExecutionLog.name, schema: ExecutionLogSchema }]),
  ],
  providers: [ExecutionService],
  controllers: [ExecutionController],
})
export class ExecutionModule {}
