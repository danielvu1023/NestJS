import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common/decorators/modules';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    HttpModule.register({
      timeout: 20000,
    }),
    ConfigModule,
  ],
  providers: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}
