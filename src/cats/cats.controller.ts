import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { HttpCacheInterceptor } from 'src/common/http-cache.interceptor';
import { CatDto } from './cats.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get()
  async findAll(): Promise<string[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return this.catsService.findAll();
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

// Where to handle caching ?
// Declared Caching for all get requests in controller
