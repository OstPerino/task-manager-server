import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('API for task manager which made for diplom to SibFU')
    .setVersion('1.0')
    .addTag('Task Manager REST API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.setGlobalPrefix('api');

  await app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
}

bootstrap();
