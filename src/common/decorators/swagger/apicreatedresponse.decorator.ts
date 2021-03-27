//https://docs.nestjs.com/openapi/operations

import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';

export const ApiCreatedResponseData = <TModel extends Type<any>>(
  options: ApiResponseOptions & { type: TModel },
) => {
  return applyDecorators(
    ApiCreatedResponse({
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
