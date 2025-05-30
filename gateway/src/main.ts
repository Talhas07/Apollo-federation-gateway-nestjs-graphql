import { NestFactory } from '@nestjs/core';
import { AppModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();
