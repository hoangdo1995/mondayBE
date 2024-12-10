import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

const logger = new Logger('DatabaseConnection');

export const databaseProviders = [
    {
        provide:'DATABASE_CONNECTION',
        useFactory: async(configService:ConfigService): Promise<typeof mongoose> => {
            const mongoUrl = configService.get<string>('MONGODB_URL');
            if (!mongoUrl) {
                logger.error('MONGODB_URL is not defined in environment variables');
                throw new Error('MONGODB_URL is not defined in environment variables');
              }
        
              try {
                logger.log(`Attempting to connect to MongoDB at ${mongoUrl}`);
                const connection = await mongoose.connect(mongoUrl);
                logger.log('Connected to MongoDB successfully');
                return connection;
              } catch (error) {
                logger.error('Failed to connect to MongoDB', error.message);
                throw error; // Rethrow để ứng dụng biết lỗi
              }
        },
        inject:[ConfigService]
    }
]
