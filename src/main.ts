import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { loadApiDocs } from './utils/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiDocs = await loadApiDocs();
  const configService = app.get(ConfigService);

  SwaggerModule.setup('api', app, apiDocs);

  const server = await app.listen(configService.get('PORT') || 4000);

  process.on('SIGINT', () => server.close());
  process.on('SIGTERM', () => server.close());
}
bootstrap();
