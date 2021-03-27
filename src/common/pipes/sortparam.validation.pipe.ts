import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { FilterUtils } from '../utils/filter.utils';

@Injectable()
export class SortParamValidationPipe<T> implements PipeTransform {
  constructor(private allowFields: Array<keyof T>) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const isAllow = FilterUtils.isAllowedProperty<T>(
      this.allowFields,
      'sortParam',
      value,
    );
    if (!isAllow) {
      throw new BadRequestException(
        `These are the values allowed for the sortParam property: ${this.allowFields.join(
          ',',
        )}`,
      );
    }
    return value;
  }
}
