import { bind, BindingScope, inject } from '@loopback/core';
import { OpenexchangeratesService, Rates } from './openexchangerates.service';
import { openexchangeratesAppId as appId } from '../config'
import { API_ERROR, CURRENCY_NOT_FOUND, REQUEST_ERROR } from '../constants';

export interface CurrencyConverterResult {
  from: string
  to: string
  rate: number
}

export interface CurrencyConverter {
  convert(from: string, to: string, email: string): Promise<CurrencyConverterResult>
}

@bind({ scope: BindingScope.TRANSIENT })
export class CurrencyConverterService implements CurrencyConverter {
  constructor(
    @inject('services.Openexchangerates')
    protected openexchangeratesService: OpenexchangeratesService
  ) { }

  public async convert(from: string, to: string, email: string): Promise<CurrencyConverterResult> {
    if (!from || !to || !email) {
      throw Error(REQUEST_ERROR)
    }

    const jsonPath = await this.openexchangeratesService.getLatestRates(appId, from, to)
    const result = jsonPath?.[0]

    if (!result || !result.rates) {
      throw Error(API_ERROR)
    }

    const currencies = Object.keys(result.rates)
    if (!currencies.includes(from) || !currencies.includes(to)) {
      throw Error(CURRENCY_NOT_FOUND)
    }

    return this._convert(result.rates, from, to)
  }

  // ATTENTION! Due to the fact that the free openexchangerate plan does not allow us to set
  // the base currency, I had to convert it via an intermediate currency USD
  private _convert(rates: Rates, from: string, to: string): CurrencyConverterResult {
    const rate = 1 / rates[from] * rates[to]
    return {
      from,
      to,
      rate
    }
  }
}
