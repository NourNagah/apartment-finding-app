import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  const corsOrigin = process.env.CORS_ORIGIN || '*';
  app.enableCors({ origin: corsOrigin, credentials: false });

  const config = new DocumentBuilder()
    .setTitle('Home-Finding App API')
    .setDescription('Public REST API for apartments search, details, and creation. Pagination supported with limit/offset. Validation and DTOs enforced.')
    .setVersion('1.2.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = parseInt(process.env.PORT || '4000', 10);
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Backend running on http://localhost:${port}`);
}

bootstrap();