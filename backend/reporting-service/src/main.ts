import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Reporting service might also be a REST API for the frontend to fetch reports
  await app.listen(process.env.PORT || 3003);
}
bootstrap();
