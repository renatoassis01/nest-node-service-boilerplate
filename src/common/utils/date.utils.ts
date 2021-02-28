import * as moment from 'moment';
import { DateFormatEnum } from '../enums/dateformat.enum';

export class DateUtils {
  public static formatDate(date: Date, outputFormat: DateFormatEnum): string {
    return moment(date, true).format(outputFormat);
  }

  public static formatDateToString(
    date: string,
    outputFormat: DateFormatEnum,
  ): string {
    return moment(date.trim(), true).format(outputFormat);
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
    return moment(date, outputFormat, true)
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
    return moment(date, outputFormat)
      .add(amount, unit)
      .format(outputFormat)
      .toString();
  }
}
