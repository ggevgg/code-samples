import { inject } from "@loopback/context";
import { CurrencyConverterService, EmailService } from "../services";

export class CurrencyConverterController {
  constructor(
    @inject('services.CurrencyConverterService')
    protected currencyConverterService: CurrencyConverterService,
    @inject('services.EmailService')
    protected emailService: EmailService,
  ) { }

  async getConversionRate(from: string, to: string, email: string): Promise<void> {
    const result = await this.currencyConverterService.convert(from, to, email);
    await this.emailService.sendEmail(email, result)
  }
}
