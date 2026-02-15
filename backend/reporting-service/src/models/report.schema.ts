import { Schema, model } from 'mongoose';

export interface IReport {
  project_id: string;
  summary: string;
  test_results: any[];
  timestamp: Date;
}

const reportSchema = new Schema<IReport>({
  project_id: { type: String, required: true },
  summary: { type: String, required: true },
  test_results: [Schema.Types.Mixed],
  timestamp: { type: Date, default: Date.now },
});

export const Report = model<IReport>('Report', reportSchema);
