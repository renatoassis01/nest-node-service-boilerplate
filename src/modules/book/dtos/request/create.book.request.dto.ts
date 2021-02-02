import { ApiProperty } from '@nestjs/swagger';
import { IsNotBlank } from 'src/common/utils/validators/isnotblank.validator';
import { IsOptional } from 'class-validator';
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
