import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExecutionLogDocument = ExecutionLog & Document;

@Schema({ collection: 'executionlogs' })
export class ExecutionLog {
  @Prop({ required: true })
  test_case_id: string;

  @Prop({ required: true, default: Date.now })
  timestamp: Date;

  @Prop({ required: true })
  step: string;

  @Prop({ type: Object })
  request_data: any;

  @Prop({ type: Object })
  response_data: any;

  @Prop({ required: true, enum: ['INFO', 'ERROR'] })
  log_level: string;
}

export const ExecutionLogSchema = SchemaFactory.createForClass(ExecutionLog);
