import { registerDecorator, ValidationOptions } from 'class-validator';
/**
 * Valida se é um número inteiro
 * @param validationOptions
 */
export function IsInteger(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isInteger',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: `the property ${propertyName} must be an integer`,
      },
      validator: {
        validate(value: any) {
          return Number.isInteger(+value);
        },
      },
    });
  };
}
