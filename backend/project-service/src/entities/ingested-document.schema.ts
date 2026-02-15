import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IngestedDocumentDocument = IngestedDocument & Document;

@Schema()
export class IngestedDocument {
  @Prop({ required: true })
  project_id: string;

  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, enum: ['MANUAL', 'USER_STORY', 'TRANSCRIPT'] })
  type: string;
}

export const IngestedDocumentSchema = SchemaFactory.createForClass(IngestedDocument);
