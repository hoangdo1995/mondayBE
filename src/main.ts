import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  const app = await NestFactory.create(AppModule);
  // inject configService
  const configService = app.get(ConfigService);

  // enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các thuộc tính không được định nghĩa trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu có thuộc tính không hợp lệ
      transform: true, // Tự động chuyển đổi kiểu dữ liệu
    }),
  );
  try {
    app.enableCors({
      origin: ['http://localhost:3001','http://localhost:3000'], // Địa chỉ client,

    })
    const port:number = configService.get<number>('PORT')||3000;
    await app.listen(port);
    logger.log(`Application is running on http://localhost:${port}`);
  } catch (error) {
    logger.error('Failed to start application', error.message);
  }
}
bootstrap();
