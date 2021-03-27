import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IBaseError } from '../../base/interfaces/base.error.dto';

export class ErrorReponseDTO implements IBaseError {
  @ApiProperty({
    description: 'Http status code',
    enum: [
      HttpStatus.FORBIDDEN,
      HttpStatus.NOT_FOUND,
      HttpStatus.METHOD_NOT_ALLOWED,
      HttpStatus.NOT_ACCEPTABLE,
      HttpStatus.INTERNAL_SERVER_ERROR,
      HttpStatus.NOT_IMPLEMENTED,
      HttpStatus.BAD_GATEWAY,
    ],
    example: 400,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    description: 'Message error',
    type: [String, Array<string>()],
    examples: ['sortParam should not be empty', 'sortParam must be a string'],
    example: 'These are the values allowed for the fieldMatching property',
  })
  message: string | string[];

  @ApiProperty({
    description: 'Error description',
    type: String,
    example: 'Bad Request',
  })
  error: string;

  constructor(data: IBaseError) {
    this.statusCode = data.statusCode;
    this.message = data.message;
    this.error = data.error;
  }
}
