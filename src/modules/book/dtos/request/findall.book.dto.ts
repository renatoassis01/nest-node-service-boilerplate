import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseFindManyRequestDTO } from '../../../../common/base/dtos/request/base.findmany.dto';

export class FindAllBookRequestDTO extends BaseFindManyRequestDTO {
  @ApiPropertyOptional({
    description: 'name book',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'ISBN book',
  })
  @IsString()
  @IsOptional()
  isbn?: string;

  @ApiPropertyOptional({
    description: 'Author book',
  })
  @IsString()
  @IsOptional()
  author?: string;
}
