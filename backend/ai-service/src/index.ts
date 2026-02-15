import * as amqp from 'amqplib';
import mongoose from 'mongoose';
import { GoogleGenerativeAI } from '@google/generative-ai';

async function bootstrap() {
  console.log('AI Service starting...');
  // Initialize MongoDB, RabbitMQ, etc.
}

bootstrap().catch(err => console.error(err));
