import * as amqp from 'amqplib';
import mongoose from 'mongoose';
import { chromium } from 'playwright';

async function bootstrap() {
  console.log('Execution Service starting...');
  // Initialize Playwright, RabbitMQ, etc.
}

bootstrap().catch(err => console.error(err));
