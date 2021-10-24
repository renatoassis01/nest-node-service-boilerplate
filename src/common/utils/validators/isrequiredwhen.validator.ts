import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

interface RequiredOptions<T> {
  values: string[];
  properties: Array<keyof T>;
}

@ValidatorConstraint({ name: 'isOptionalWhen' })
class IsRequiredWhenConstraint implements ValidatorConstraintInterface {
  private _option = false;
  get option() {
    return this._option;
  }
  set option(value: any) {
    this._option = value;
  }

  validate(value: string, args: ValidationArguments): boolean {
    if (value) {
      const [options] = args.constraints;
      let isInclude = false;

      for (const option of options) {
        if (option.values.includes(value)) {
          delete args.object[args.property];
          const keys = Object.keys(args.object);

          for (const item of option.properties) {
            isInclude = true;

            if (!keys.includes(item)) {
              isInclude = false;
              break;
            }
          }

          this.option = option;
          if (isInclude) break;
        }
      }

      return isInclude;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return `When the property ${
      args.property
    } is equal(s) for ${this.option.values.join(
      ',',
    )}, the properties ${this.option.properties.join(',')} are required`;
  }
}

export function IsRequiredWhen<T = Record<string, unknown>>(
  options: RequiredOptions<T>[],
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsRequiredWhenConstraint,
    });
  };
}
