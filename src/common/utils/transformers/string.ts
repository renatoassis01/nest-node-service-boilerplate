import { Transform } from 'class-transformer';

const ONLY_NUMBER = /[^0-9]+/g;

export function TransformToPhoneBRWithoutMask(): PropertyDecorator {
  return Transform(({ value }) => String(value).replaceAll(ONLY_NUMBER, ''));
}
