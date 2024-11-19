import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from '@nestjs/config';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpCacheInterceptor } from './common/http-cache.interceptor';

@Module({
  imports: [
    CatsModule,
    ConfigModule.forRoot(),
    CacheModule.register({ isGlobal: true, ttl: 10000 }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
  ],
})
export class AppModule {}
