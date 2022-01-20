import { registerDecorator, ValidationOptions } from 'class-validator';
import * as cpf from '@fnando/cpf';

/**
 * Valida se é um CNPJ
 * @param validationOptions
 */
export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: `the property ${propertyName} not a CPF`,
      },
      validator: {
        validate(value: any) {
          if (!value) return false;
          return cpf.isValid(value);
        },
      },
    });
  };
}
