import { registerDecorator, ValidationOptions } from 'class-validator';
/**
 * Valida se é um número
 * @param validationOptions
 */
export function IsNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: `the property ${propertyName} must be a number`,
      },
      validator: {
        validate(value: any) {
          return !isNaN(value);
        },
      },
    });
  };
}
