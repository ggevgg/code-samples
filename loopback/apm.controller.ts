import { ApmService } from './services/apm.service';
import { get, param } from '@loopback/rest';
import { inject } from '@loopback/core';
import {
  IMPORT_CONTAINER_OPTIONS,
  EXPORT_BOOKING_REPORT_OPTIONS
} from '../../consts/response.const';
import {
  ContainerResponseData,
  BookingReportResponseData
} from './interfaces';
import { throwNotFoundError } from '../../utils/errors';

export class ApmController {
  constructor(
    @inject('services.ApmService')
    private apmService: ApmService
  ) { }

  /**
   * Get container info by container number for apm
   * @param containerNumber
   */
  @get('/apm/import/containers/{containerNumber}', IMPORT_CONTAINER_OPTIONS)
  public async importContainers(
    @param({
      name: 'containerNumber',
      in: 'path',
      description: 'Container Number in ISO 6346 format'
    }) containerNumber: string
  ): Promise<ContainerResponseData> {
    const containerInfo = await this.apmService.getContainers(containerNumber);
    if (!containerInfo || !containerInfo.ContainerAvailabilityResults || !containerInfo.ContainerAvailabilityResults.length) {
      return throwNotFoundError();
    }

    // remove No string from appointment date
    if (containerInfo.ContainerAvailabilityResults[0].AppointmentDate === 'No') {
      containerInfo.ContainerAvailabilityResults[0].AppointmentDate = '';
    }
    return containerInfo;
  }

  /**
   * Get booking report by booking number for apm
   * @param bookingNumber
   */
  @get('/apm/export/bookings/{bookingNumber}', EXPORT_BOOKING_REPORT_OPTIONS)
  public async exportBookings(
    @param({
      name: 'bookingNumber',
      in: 'path',
      description: 'Booking Number, alphanumeric characters'
    }) bookingNumber: string
  ): Promise<BookingReportResponseData> {
    const bookingReport = await this.apmService.getBookingReport(bookingNumber);
    if (!bookingReport ||
      bookingReport.BookingEnquiries && !bookingReport.BookingEnquiries.length &&
      bookingReport.GroupedBookingEnquiries && !bookingReport.GroupedBookingEnquiries.length) {
      throwNotFoundError();
    }
    return bookingReport;
  }

}
