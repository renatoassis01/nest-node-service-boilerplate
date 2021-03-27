import { HttpStatus } from '@nestjs/common';

export interface IBaseError {
  statusCode: HttpStatus;
  error: string;
  message: string | string[];
}
