import * as moment from 'moment';
import { DateFormatEnum } from './enums/date.format.enum';

export class DateUtils {
  public static formatDate(date: Date, outputFormat: DateFormatEnum): string {
    return moment(date, true).format(outputFormat);
  }

  public static stringToDate(date: string, outputFormat: DateFormatEnum): Date {
    return moment(new Date(date), outputFormat, true).toDate();
  }

  public static subtractDateToString(
    date: string,
    amount: number,
    unit: moment.unitOfTime.DurationConstructor,
    outputFormat: DateFormatEnum,
  ): string {
    return moment(new Date(date), outputFormat, true)
      .subtract(amount, unit)
      .format(outputFormat)
      .toString();
  }

  public static addDateToString(
    date: string,
    amount: number,
    unit: moment.unitOfTime.DurationConstructor,
    outputFormat: DateFormatEnum,
  ): string {
    return moment(new Date(date), outputFormat, true)
      .add(amount, unit)
      .format(outputFormat)
      .toString();
  }
}
