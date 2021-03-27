import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export const ApiTenantHeader = (required = true) => {
  return applyDecorators(
    ApiHeader({
      name: 'tenantid',
      description: 'TenantId',
      required,
    }),
  );
};
