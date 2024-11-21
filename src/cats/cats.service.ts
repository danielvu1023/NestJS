import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { access } from 'fs';
import {
  catchError,
  firstValueFrom,
  Observable,
  retry,
  retryWhen,
  timeout,
  timer,
} from 'rxjs';
import { Order } from './cats.interface';

@Injectable()
export class CatsService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}
  private readonly cats: string[] = [];
  private readonly logger = new Logger(CatsService.name);
  findAll(): string[] {
    return ['testing'];
  }
  // getWeather(): Observable<AxiosResponse<any>> {
  //   return this.httpService.get(
  //     `http://api.weatherstack.com/current?access_key=${process.env.ACCESS_KEY}&query=New York`,
  //   );
  // }

  async getOrder(orderId: number): Promise<Order> {
    this.logger.debug({ object: 'hi' });
    const store_hash = this.configService.get<string>(
      'STAGING_BIGCOMMERCE_STORE_HASH',
    );
    const access_token = this.configService.get<string>(
      'STAGING_BIGCOMMERCE_TOKEN',
    );
    const headers = {
      'X-Auth-Token': access_token,
      Accept: 'application/json',
    };
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `https://api.bigcommerce.com/stores/${store_hash}/v2/orders/${orderId}`,
          { headers },
        )
        .pipe(
          retry({
            count: 3,
            delay: (err, retryCount) => {
              console.log(`Error: ${err.message}, retry count: ${retryCount}`);
              return timer(2000);
            },
            resetOnSuccess: true,
          }),
          catchError((err) => {
            throw new Error(`Request failed after retries: ${err.message}`);
          }),
        ),
    );

    return { id: data.id, status: data.status_id };
  }
}
