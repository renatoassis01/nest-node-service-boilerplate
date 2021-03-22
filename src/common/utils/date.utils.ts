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
    return moment(new Date(date), outputFormat, true)
      .subtract(amount, unit)
      .format(outputFormat);
  }

  public static addDateToString(
    date: string,
    amount: number,
    unit: moment.unitOfTime.DurationConstructor,
    outputFormat: DateFormatEnum,
  ): string {
    return moment(new Date(date), outputFormat, true)
      .add(amount, unit)
      .format(outputFormat);
  }

  public static addOneDayToString(
    date: string,
    outputFormat = DateFormatEnum.YYYY_MM_DD,
  ): string {
    const dayInMillesecond = 1000 * 60 * 60 * 24;
    const aux = moment(new Date(date).getTime() + dayInMillesecond).toDate();
    return moment(aux).add(1, 'day').startOf('day').format(outputFormat);
  }
}
