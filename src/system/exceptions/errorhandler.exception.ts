import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ErrorReponseDTO } from '../../common/dtos/response/error.dto';

@Catch()
export class ErrorHandlerExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let error =
      exception.status === HttpStatus.INTERNAL_SERVER_ERROR
        ? 'Sorry we are experiencing technical problems'
        : undefined;

    let message =
      exception.status === HttpStatus.INTERNAL_SERVER_ERROR
        ? 'Contact our team'
        : undefined;

    response.status(exception.status).json(
      new ErrorReponseDTO({
        statusCode: exception.response.statusCode || exception.status,
        message: message || exception.response.message || exception.message,
        error: error || exception.response.error,
      }),
    );
  }
}
