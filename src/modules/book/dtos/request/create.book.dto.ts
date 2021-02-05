import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsNotBlank } from '../../../../common/utils/validators/isnotblank.validator';
export class CreateBookRequestDTO {
  @ApiProperty({
    description: 'The name of book',
  })
  @IsNotBlank('name', { message: 'not blank' })
  name: string;

  @ApiProperty({
    description: 'number of ISBN',
  })
  @IsNotBlank('isbn', { message: 'ibsn not blank' })
  isbn: string;

  @ApiProperty({
    description: 'Name author',
    required: false,
  })
  @IsOptional()
  author?: string;
}
