import moment from 'moment-timezone';

import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDateAfter' })
class IsDateAfterConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    if (value) {
      const date1 = moment(value);
      const date2 = moment(args.object[args.constraints[0]]);
      return date1.isAfter(date2);
    }
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} is not after ${args.object[args.constraints[0]]}`;
  }
}

export function IsDateAfter<T = Record<string, unknown>>(
  field: Array<keyof T>,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [field],
      validator: IsDateAfterConstraint,
    });
  };
}
