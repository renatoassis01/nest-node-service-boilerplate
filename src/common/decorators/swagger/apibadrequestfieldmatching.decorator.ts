import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiBadRequestFieldMatching = <T>(allowFields: Array<keyof T>) => {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: `These are the values allowed for the fieldMatching property: ${allowFields.join(
        ',',
      )}`,
    }),
  );
};
