import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectLogDocument = ProjectLog & Document;

@Schema()
export class ProjectLog {
  @Prop({ required: true })
  project_id: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  level: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const ProjectLogSchema = SchemaFactory.createForClass(ProjectLog);
