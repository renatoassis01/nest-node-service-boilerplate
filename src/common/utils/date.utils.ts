import * as moment from 'moment';
import * as tz from 'moment-timezone';
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
    const newDate = moment(
      moment(new Date(date), DateFormatEnum.DD_MM_YYYY_HH_MM, true)
        .add(amount, unit)
        .format(outputFormat),
    );
    return newDate.toString();
  }

  public static addDayToString(
    date: string,
    amount: number,
    unit: 'day' | 'days',
    outputFormat: DateFormatEnum,
  ): string {
    // seconds * minutes * hours * milliseconds = 1 day
    const day = amount * (60 * 60 * 24 * 1000);
    const unixTimestamp = new Date(date).getTime() + day;
    return tz(unixTimestamp, 'UTC', true).startOf('day').format(outputFormat);
  }

  public static addDayWithTzToString(
    date: string,
    amount: number,
    unit: 'day' | 'days',
    timezone: string,
    outputFormat: DateFormatEnum,
  ): string {
    const newDate = tz(new Date(date), timezone, true);

    return newDate.add(amount, unit).format(outputFormat);
  }
}
