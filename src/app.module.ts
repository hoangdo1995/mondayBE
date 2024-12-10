import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { AuthMiddleware } from './middlewares/auth.middleware';
@Module({
  imports: [
    // 
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env'
    }),
    JwtModule.register({
          global: true,

          secret: process.env.JWT_SECRET_KEY || 'default_secret', // Use environment variables for secrets in production
          signOptions: { expiresIn: '5' },
      }),
    DatabaseModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController,

   ],
  providers: [
    {
      provide:APP_GUARD,
      useClass:RolesGuard
    },
    AppService, 
    AuthGuard,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('users');
  }
}
