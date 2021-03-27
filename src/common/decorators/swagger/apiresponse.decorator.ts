//https://docs.nestjs.com/openapi/operations

import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';

export const ApiResponseData = <TModel extends Type<any>>(
  options: ApiResponseOptions & { type: TModel },
) => {
  return applyDecorators(
    ApiResponse({
      status: options.status,
      description: options.description,
      headers: options.headers,
      schema: {
        type: 'object',
        properties: {
          data: {
            $ref: getSchemaPath(options.type),
          },
        },
      },
    }),
  );
};
