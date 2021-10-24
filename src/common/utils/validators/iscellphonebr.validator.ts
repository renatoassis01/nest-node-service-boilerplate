const CELLPHONE_BR = /^\s*(\d{2}|\d{0}|\(\d{2}\))[-. ]?(\d{5}|d{4})[-. ]?(\d{4})[-. ]?\s*$/;
const CELLPHONE_BR_WITHOUT_DD = /^(\d{5}|d{4})[-. ]?(\d{4})[-. ]?\s*$/;

import { registerDecorator, ValidationOptions } from 'class-validator';

const validationPhoneNumber = (isWithoutDD = false, value: string): boolean => {
  if (isWithoutDD) return CELLPHONE_BR_WITHOUT_DD.test(value);
  return CELLPHONE_BR.test(value);
};

const defaultMessage = (
  propertyName: string,
  validationOptions?: ValidationOptions,
): string => {
  if (validationOptions?.message) {
    if (typeof validationOptions?.message === 'string')
      return validationOptions?.message;
  }

  return !validationOptions?.each
    ? `${propertyName} property value is not a brazilian cell phone`
    : `one or more values of the ${propertyName} property, they are not Brazilian cell phones`;
};

export function IsCellPhoneBR(
  validationOptions?: ValidationOptions & { isWithoutDD?: boolean },
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isCellPhoneBR',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: defaultMessage(propertyName, validationOptions),
      },
      validator: {
        validate(value: any) {
          if (validationOptions?.each) {
            let isValid = true;
            for (const phone of Array.of(value)) {
              if (
                !validationPhoneNumber(validationOptions?.isWithoutDD, phone)
              ) {
                isValid = false;
                break;
              }
            }
            return isValid;
          }
          return validationPhoneNumber(validationOptions?.isWithoutDD, value);
        },
      },
    });
  };
}
