import { getService } from '@loopback/service-proxy';
import { inject, Provider } from '@loopback/core';
import { OpenexchangeratesDataSource } from '../datasources';

export interface Rates {
  [key: string]: number
}

export interface GetLatestRatesResponse {
  disclaimer: string
  license: string
  timestamp: number
  base: string
  rates: Rates
}

export interface OpenexchangeratesService {
  getLatestRates(appId: string, from: string, to: string): Promise<GetLatestRatesResponse[]>
}

export class OpenexchangeratesProvider implements Provider<OpenexchangeratesService> {
  constructor(
    @inject('datasources.openexchangerates')
    protected dataSource: OpenexchangeratesDataSource = new OpenexchangeratesDataSource(),
  ) { }

  value(): Promise<OpenexchangeratesService> {
    return getService(this.dataSource);
  }
}
