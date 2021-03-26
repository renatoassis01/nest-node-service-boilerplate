import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as _ from 'lodash';

@ValidatorConstraint({ name: 'isDependentOf' })
class IsDependentOfConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    return args.constraints
      .map((field) => args.object[field])
      .some((val) => !_.isEmpty(val) && args.property !== val);
  }

  defaultMessage(args: ValidationArguments): string {
    return `The ${args.property} property also depends: ${args.constraints.join(
      ',',
    )}`;
  }
}

export function IsDependentOf<T>(
  fields: Array<keyof T>,
  validationOptions?: ValidationOptions,
) {
  return (object: {}, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: fields,
      validator: IsDependentOfConstraint,
    });
  };
}
