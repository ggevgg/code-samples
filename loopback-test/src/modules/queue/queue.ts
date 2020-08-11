/* eslint-disable @typescript-eslint/no-misused-promises */
import { Squiss, Message } from 'squiss-ts'
import { CurrencyConverterController } from '../../controllers/currencyConverter.controller';
import { types, maxInFlight, bodyFormat } from './queue.consts';
import {
  accessKeyId,
  secretAccessKey,
  region,
  queueName,
  endpoint
} from '../../config'

interface MessageBody {
  from: string
  to: string
  email: string
  type: string
}

interface QMessage extends Message {
  body?: MessageBody
}

export class Queue {
  private squiss: Squiss

  constructor() {
    this.squiss = new Squiss({
      awsConfig: {
        accessKeyId,
        secretAccessKey,
        region,
        endpoint,
      },
      queueName,
      bodyFormat,
      maxInFlight,
    })
  }

  public async initSubscriber(currencyConverterController: CurrencyConverterController) {

    this.squiss.on('message', async (message: QMessage) => {
      if (!message.body) {
        return;
      }
      const { from, to, email, type } = message.body;
      if (type !== types.getCurrencyRate) {
        return;
      }
      await currencyConverterController.getConversionRate(from, to, email)
      await message.del()
    });

    await this.squiss.start();

  }

  public sendMessage(message: MessageBody) {
    return this.squiss.sendMessage(message, 0);
  }
}
