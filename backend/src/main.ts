import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Permite peticiones desde el frontend Next.js
  app.setGlobalPrefix('api'); // Opcional pero recomendado: todas las rutas empiezan por /api/
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
