import { Schema, model } from 'mongoose';

export interface IGeminiInteraction {
  project_id: string;
  prompt: string;
  response: string;
  context_type: 'ANALYSIS' | 'REEVALUATION' | 'Q&A';
  timestamp: Date;
}

const geminiInteractionSchema = new Schema<IGeminiInteraction>({
  project_id: { type: String, required: true },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  context_type: { type: String, enum: ['ANALYSIS', 'REEVALUATION', 'Q&A'], required: true },
  timestamp: { type: Date, default: Date.now },
});

export const GeminiInteraction = model<IGeminiInteraction>('GeminiInteraction', geminiInteractionSchema);
