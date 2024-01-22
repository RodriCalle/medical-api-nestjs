import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Medical API v1')
    .setDescription('The Medical API description')
    .setVersion('1.0')
    .addBearerAuth()
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
