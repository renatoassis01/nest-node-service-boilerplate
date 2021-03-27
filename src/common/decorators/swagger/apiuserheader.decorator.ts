import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export const ApiUserRequestHeader = (required = true) => {
  return applyDecorators(
    ApiHeader({
      name: 'userid',
      description: 'User Request Id',
      required,
    }),
  );
};
