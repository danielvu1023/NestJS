import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { access } from 'fs';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class CatsService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}
  private readonly cats: any[] = [];
  findAll(): any[] {
    return this.cats;
  }
  // getWeather(): Observable<AxiosResponse<any>> {
  //   return this.httpService.get(
  //     `http://api.weatherstack.com/current?access_key=${process.env.ACCESS_KEY}&query=New York`,
  //   );
  // }

  async getWeather(): Promise<any> {
    const access_key = this.configService.get<string>('ACCESS_KEY');
    const { data } = await firstValueFrom(
      this.httpService.get(
        `http://api.weatherstack.com/current?access_key=${access_key}&query=New York`,
      ),
    );
    return data;
  }
}
