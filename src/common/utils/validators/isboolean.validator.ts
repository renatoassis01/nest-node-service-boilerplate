import { registerDecorator, ValidationOptions } from 'class-validator';

/**
 * Valida se é um boolean
 * @param validationOptions
 */
export function IsBoolean(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isBoolean',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: `the property ${propertyName} not a boolean value`,
      },
      validator: {
        validate(data: any) {
          if (
            data.value === 'false' ||
            data.value === 'true' ||
            data.value === true ||
            data.value === false
          )
            return true;
        },
      },
    });
  };
}
