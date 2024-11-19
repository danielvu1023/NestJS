import { Controller, Get, Inject } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  @Get()
  findAll(): any[] {
    return this.catsService.findAll();
  }
  @Get('weather')
  async getWeather(): any {
    const value = await this.cacheManager.get('weather');
    if (value) {
      return value;
    } else {
      const weatherData = this.catsService.getWeather();
    }
  }
}
