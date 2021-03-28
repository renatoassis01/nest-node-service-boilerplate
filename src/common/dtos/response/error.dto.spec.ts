import { HttpStatus } from '@nestjs/common';
import { IBaseError } from '../../base/interfaces/base.error.dto';
import { ErrorReponseDTO } from './error.dto';

describe('Suite Test for ErrorReponseDTO', () => {
  it('tests format error response CASE 1', () => {
    const error: IBaseError = {
      statusCode: HttpStatus.NOT_FOUND,
      error: 'Not Found',
      message: 'entity not found',
    };

    const errorDTO = new ErrorReponseDTO(error);
    expect(errorDTO).toEqual(error);
  });

  it('tests format response CASE 2', () => {
    const error: IBaseError = {
      statusCode: HttpStatus.NOT_FOUND,
      error: 'Not Found',
      message: ['name must be a string', 'age must be a string'],
    };
    const errorDTO = new ErrorReponseDTO(error);
    expect(errorDTO).toEqual(error);
  });
});
