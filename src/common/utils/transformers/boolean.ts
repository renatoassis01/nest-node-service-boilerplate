import { Transform } from 'class-transformer';
import { TransformUtils } from '../transform.utils';

export function TransformToBoolean() {
  return Transform((value) => TransformUtils.ToBoolean(value));
}
