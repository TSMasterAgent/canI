import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportingService } from './reporting.service';
import { ReportingController } from './reporting.controller';
import { ExecutionLog, ExecutionLogSchema } from '../models/execution-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ExecutionLog.name, schema: ExecutionLogSchema }]),
  ],
  providers: [ReportingService],
  controllers: [ReportingController],
})
export class ReportingModule {}
