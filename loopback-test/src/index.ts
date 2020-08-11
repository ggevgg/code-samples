import { ConversionApplication } from './application';
import { ApplicationConfig } from '@loopback/core';
import { CurrencyConverterController } from './controllers';
import { Queue } from './modules/queue/queue';
import { processType } from './config';

export { ConversionApplication };

export async function main(options: ApplicationConfig = {}) {
  const app = new ConversionApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log('Process type', processType);

  if (processType === 'consumer') {
    const currencyConverterController = app.controller(CurrencyConverterController);
    const controllerInstance = await currencyConverterController.getValue(app);
    const queue = new Queue();
    await queue.initSubscriber(controllerInstance);
  }

  return app;
}
