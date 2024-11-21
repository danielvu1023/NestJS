import {
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { HttpCacheInterceptor } from 'src/common/http-cache.interceptor';
import { CatDto, OrderDto } from './cats.interface';
import { Throttle } from '@nestjs/throttler';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get()
  async findAll(): Promise<string[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return this.catsService.findAll();
  }
  // @Throttle({ default: { limit: 1, ttl: 60000 } })
  @Get('order/:id')
  async getOrder(@Param('id', ParseIntPipe) id: number): Promise<OrderDto> {
    const order = await this.catsService.getOrder(id);
    const orderDto = new OrderDto({
      id: order.id,
      status: order.status,
    });
    return orderDto;
  }
  @Get('weather')
  async getWeatherCache(): Promise<CatDto> {
    const catDto = new CatDto({
      name: 'Kitty',
      id: 5,
    });
    return catDto;
  }
}
