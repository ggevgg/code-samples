import { inject } from '@loopback/context';
import {
  // get,
  param,
  HttpErrors
} from '@loopback/rest';
// import {
//   EXPORT_BOOKING_REPORT_OPTIONS,
//   IMPORT_BILL_OF_LADING_OPTIONS,
//   IMPORT_CONTAINER_OPTIONS
// } from '../consts/response.const';
import {
  TerminalModuleController,
  TerminalController,
  ImportContainerInfo,
  ExportBookingInfo,
  ImportBillOfLadingInfo
} from '../interfaces';
import * as Sentry from '@sentry/node';

export class MainController implements TerminalController {
  constructor(
    @inject('controllers.PnctController')
    private pnctController: TerminalModuleController,
    @inject('controllers.MaherController')
    private maherController: TerminalModuleController,
    @inject('controllers.ApmController')
    private apmController: TerminalModuleController,
    @inject('controllers.NyctController')
    private nyctController: TerminalModuleController,
    @inject('controllers.BayonneController')
    private bayonneController: TerminalModuleController
  ) { }

  /**
   * Get container info by container number
   * @param terminal
   * @param containerNumber
   */
  @get('/import/containers/{terminal}/{containerNumber}', IMPORT_CONTAINER_OPTIONS)
  async importContainers(
    @param({
      name: 'terminal',
      in: 'path',
      description: 'Terminal Code, for example \'pnct\''
    }) terminal: string,
    @param({
      name: 'containerNumber',
      in: 'path',
      description: 'Container Number in ISO 6346 format'
    }) containerNumber: string
  ): Promise<ImportContainerInfo> {
    const controller = this._getController(terminal);
    if (!controller || typeof controller.importContainers !== 'function') {
      Sentry.captureMessage(`NotAcceptableException export ${terminal} ${containerNumber}`);
      throw new HttpErrors[406]('Parser error');
    }
    return controller.importContainers(containerNumber);
  }


  /**
   * Get booking report by booking number
   * @param terminal
   * @param bookingNumber
   */
  @get('/export/bookings/{terminal}/{bookingNumber}', EXPORT_BOOKING_REPORT_OPTIONS)
  async exportBookings(
    @param({
      name: 'terminal',
      in: 'path',
      description: 'Terminal Code, for example \'pnct\''
    }) terminal: string,
    @param({
      name: 'bookingNumber',
      in: 'path',
      description: 'Booking Number, alphanumeric characters'
    }) bookingNumber: string
  ): Promise<ExportBookingInfo> {
    const controller = this._getController(terminal);
    if (!controller || typeof controller.exportBookings !== 'function') {
      Sentry.captureMessage(`NotAcceptableException export ${terminal} ${bookingNumber}`);
      throw new HttpErrors[406]('Parser error');
    }
    return controller.exportBookings(bookingNumber);
  }

  /**
   * Get import container details in a terminal by Bill Of Lading #
   * @param terminal
   * @param billOfLadingNumber
   */
  @get('/import/billofladings/{terminal}/{billOfLadingNumber}', IMPORT_BILL_OF_LADING_OPTIONS)
  async importBillOfLadings(
    @param({
      name: 'terminal',
      in: 'path',
      description: 'Terminal Code, for example \'pnct\''
    }) terminal: string,
    @param({
      name: 'billOfLadingNumber',
      in: 'path',
      description: 'Bill Of Lading #'
    }) billOfLadingNumber: string
  ): Promise<ImportBillOfLadingInfo[]> {
    const controller = this._getController(terminal);
    if (!controller || typeof controller.importBillOfLadings !== 'function') {
      Sentry.captureMessage(`NotAcceptableException export ${terminal} ${billOfLadingNumber}`);
      throw new HttpErrors[406]('Parser error');
    }
    return controller.importBillOfLadings(billOfLadingNumber);
  }

  _getController(terminal: string): TerminalModuleController {
    const controllerName = `${terminal}Controller` as keyof this;
    return this[controllerName] as unknown as TerminalModuleController;
  }

}
