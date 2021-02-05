import { ApiProperty } from '@nestjs/swagger';
import { IFindManyResult } from '../../../interfaces/findmanyresult';

export abstract class BaseFindManyResponseDTO implements IFindManyResult {
  @ApiProperty({
    description: 'total records',
  })
  count: number;
  @ApiProperty({
    description: 'limite data',
  })
  limit: number;
  @ApiProperty({
    description: 'page data',
  })
  page: number;
  @ApiProperty({
    description: 'total pages data',
  })
  totalPages: number;

  data: any[];
}
