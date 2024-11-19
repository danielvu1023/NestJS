import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CatsModule, ConfigModule.forRoot(), CacheModule.register()],
})
export class AppModule {}
