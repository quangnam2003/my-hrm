declare const module: any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from 'src/global/filters/all-exception.filter';
import { ValidationPipe } from '@nestjs/common/pipes';
import cookieParser from 'cookie-parser';

function buildCorsOrigins(): string[] {
  const local = ['http://localhost:3000', 'http://localhost:3200'];
  const raw = process.env.FRONTEND_URL?.trim();
  if (!raw) return local;
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return [...new Set([withScheme, ...local])];
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: buildCorsOrigins(),
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new AllExceptionFilter());

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
