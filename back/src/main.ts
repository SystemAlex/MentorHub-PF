// filepath: /Users/gabyaybar/Desktop/PF/MentorHub-PF/back/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   const config = new DocumentBuilder()
    .setTitle('MentorHub API')
    .setDescription('Documentación de la API de MentorHub')
    .setVersion('1.0')
    .addBearerAuth() // Si usas JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Aquí defines la ruta: /api
  await app.listen(3001);
  console.log('Application is running on: http://localhost:3001');
}
bootstrap();