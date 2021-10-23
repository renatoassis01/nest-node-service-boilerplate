import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

type ValueOptions =
  | number
  | boolean
  | string
  | Date
  | symbol
  | Array<number | boolean | string | Date | symbol>;

@ValidatorConstraint({ name: 'isOptionalWhen' })
class IsOptionalWhenConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    const [property, values] = args.constraints;
    if (!value) {
      const isValid = Array.isArray(values)
        ? values.includes(args.object[property])
        : args.object[property] === values;
      return isValid;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    const key = args.constraints[0];
    const values = Array.isArray(args.constraints[1])
      ? Array.from(args.constraints[1]).join(',')
      : args.constraints[1];
    return `The ${args.property} property is only optional when ${key} is equal(s) to ${values}`;
  }
}

export function IsOptionalWhen<T = Record<string, unknown>>(
  property: keyof T,
  values: ValueOptions,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property, values],
      validator: IsOptionalWhenConstraint,
    });
  };
}
