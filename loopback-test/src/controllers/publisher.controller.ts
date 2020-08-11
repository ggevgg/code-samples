import { get, param } from "@loopback/rest";
import { Queue } from "../modules/queue/queue";
import { types } from "../modules/queue/queue.consts";
import { REQUEST_ERROR } from "../constants";

export interface Publisher {
  getConversionRate(from: string, to: string, email: string): Promise<void>
}

export class PublisherController implements Publisher {
  private queue: Queue

  constructor() {
    this.queue = new Queue()
  }

  @get('/conversion-rate')
  async getConversionRate(
    @param.query.string('from') from: string,
    @param.query.string('to') to: string,
    @param.query.string('email') email: string,
  ): Promise<void> {
    if (!from || !to || !email) {
      throw Error(REQUEST_ERROR)
    }
    await this.queue.sendMessage({
      from,
      to,
      email,
      type: types.getCurrencyRate
    })
  }
}
