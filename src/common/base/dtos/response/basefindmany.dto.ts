import { ApiProperty } from '@nestjs/swagger';
import { IFindManyResult } from '../../../interfaces/findmanyresult';

export abstract class BaseFindManyResponseDTO implements IFindManyResult {
  @ApiProperty({
    description: 'Total records stored',
  })
  count: number;

  @ApiProperty({
    description: 'Total items per page',
  })
  limit: number;

  @ApiProperty({
    description: 'Page current',
  })
  page: number;

  @ApiProperty({
    description: 'Total Pages',
  })
  totalPages: number;

  data: any[];
}
