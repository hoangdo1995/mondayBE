import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { RedisModule } from '@nestjs-modules/ioredis';
import { BoardModule } from './board/board.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path/posix';
import { BoardResolver } from './board/board.resolver';
import { BoardProvider } from './board/board.provider';

@Module({
  imports: [
    // 
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env'
    }),
    // redis config
    RedisModule.forRootAsync(
      {
      useFactory: () => ({
        type: 'single',
        url: 'redis://localhost:6379',
      }),
    }
    ),
    JwtModule.register({
          global: true,

          secret: process.env.JWT_SECRET_KEY || 'default_secret', // Use environment variables for secrets in production
          signOptions: { expiresIn: '5' },
    }),
    // redis config
    DatabaseModule,
    
    UsersModule,
    AuthModule,
    BoardModule,

    // graphql integrate
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      // GraphQL schema. for code first
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController,

   ],
  providers: [
    AppService, 
    AuthGuard,
    // board provider
    BoardResolver,
    ...BoardProvider
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path:'users',method:RequestMethod.GET},
        {path:'users',method:RequestMethod.PATCH},
        {path:'users/role',method:RequestMethod.PATCH},
        {path:'graphql', method:RequestMethod.ALL}
      );
  }
}

