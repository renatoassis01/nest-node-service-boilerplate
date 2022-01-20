import moment from 'moment-timezone';

import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDateSame' })
class IsDateSameConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    if (value) {
      const date1 = moment(value);
      const date2 = moment(args.object[args.constraints[0]]);
      return date1.isSame(date2);
    }
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} and ${
      args.object[args.constraints[0]]
    } is not same`;
  }
}

export function IsDateSame<T = Record<string, unknown>>(field: Array<keyof T>) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [field],
      validator: IsDateSameConstraint,
    });
  };
}
