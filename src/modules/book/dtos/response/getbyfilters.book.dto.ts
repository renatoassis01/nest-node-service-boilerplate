import { ApiProperty } from '@nestjs/swagger';
import { BaseGetByFiltersResponseDTO } from '../../../../common/base/dtos/response/base.getbyfilters.dto';
import { IGetByFiltersResult } from '../../../../common/interfaces/getbyfiltersresult';
import { BookResponseDTO } from './book.dto';

export class GetByFiltersBookResponseDTO extends BaseGetByFiltersResponseDTO {
  @ApiProperty({ description: 'Books', type: [BookResponseDTO] })
  readonly data: BookResponseDTO[];

  constructor(data: IGetByFiltersResult) {
    super(data);
    this.data =
      data?.data?.length > 0
        ? data.data.map((book) => new BookResponseDTO(book))
        : [];
  }
}
