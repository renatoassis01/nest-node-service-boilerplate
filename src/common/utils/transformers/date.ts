import moment from 'moment-timezone';
import { Transform } from 'class-transformer';

// YYYY: ano com quatro dígitos;
// MM: mês;
// DD: dia;
// T: indicação de início das horas;
// HH: horas;
// mm: minutos;
// ss: segundos;
// s: milissegundos;
// TZD: time zone, que corresponde a +hh:mm ou -hh:mm.

type DateFormat =
  | 'YYYYY-MM-DD HH:mm:ss'
  | 'YYYYY-MM-DD HH:mm'
  | 'YYYYY-MM-DD'
  | 'MM-DD'
  | 'YYYY-MM'
  | 'YYYY/MM'
  | 'HH:mm'
  | 'HH:mm:ss'
  | 'MMMM'
  | 'MMM';

export function TransformToDate(): PropertyDecorator {
  return Transform(({ value }) => new Date(value));
}

export function TransformToDateOffset(
  amount: number,
  unit: moment.unitOfTime.Base,
): PropertyDecorator {
  return Transform(({ value }) => moment(value, true).add(amount, unit));
}

export function TransformToDateWithTZ(timezone: string): PropertyDecorator {
  return Transform(({ value }) => moment.tz(value, timezone).format());
}

export function TransformToDateString(
  format: DateFormat & string,
): PropertyDecorator {
  return Transform(({ value }) => moment(value, true).format(format));
}
