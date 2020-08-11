import { bind, BindingScope } from '@loopback/core';
import { CurrencyConverterResult } from './currencyConverter.service';

@bind({ scope: BindingScope.TRANSIENT })
export class EmailService {
  sendEmail(email: string, body: CurrencyConverterResult) {
    console.log('email', body)
    return Promise.resolve({
      email,
      body
    })
  }
}
