import { ApiProperty } from '@nestjs/swagger';
import { IGetAllResult } from '../../../interfaces/getallresult';

export abstract class BaseGetAllResponseDTO implements IGetAllResult {
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
