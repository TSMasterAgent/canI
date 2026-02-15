import { Schema, model } from 'mongoose';

export interface IExecutionLog {
  test_case_id: string;
  project_id: string;
  timestamp: Date;
  step: string;
  request_data?: any;
  response_data?: any;
  screenshot_path?: string;
  log_level: 'INFO' | 'ERROR';
}

const executionLogSchema = new Schema<IExecutionLog>({
  test_case_id: { type: String, required: true },
  project_id: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  step: { type: String, required: true },
  request_data: Schema.Types.Mixed,
  response_data: Schema.Types.Mixed,
  screenshot_path: String,
  log_level: { type: String, enum: ['INFO', 'ERROR'], default: 'INFO' },
});

export const ExecutionLog = model<IExecutionLog>('ExecutionLog', executionLogSchema);
