import { registerDecorator, ValidationOptions } from 'class-validator';
import * as cnpj from '@fnando/cnpj';

/**
 * Valida se é um CNPJ
 * @param validationOptions
 */
export function IsCNPJ(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCNPJ',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: `the property ${propertyName} not a CPNJ`,
      },
      validator: {
        validate(value: any) {
          if (!value) return false;
          return cnpj.isValid(value);
        },
      },
    });
  };
}
