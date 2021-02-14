import { ApiProperty } from '@nestjs/swagger';
import { BaseGetAllResponseDTO } from '../../../../common/base/dtos/response/base.getall.dto';
import { IGetAllResult } from '../../../../common/interfaces/getallresult';
import { BookResponseDTO } from './book.dto';

export class GetAllBookResponseDTO extends BaseGetAllResponseDTO {
  @ApiProperty({ description: 'Books', type: [BookResponseDTO] })
  readonly data: BookResponseDTO[];

  constructor(data: IGetAllResult) {
    super();
    this.count = data.count;
    this.limit = data.limit;
    this.page = data.page;
    this.totalPages = data.totalPages;
    this.data =
      data?.data?.length > 0
        ? data.data.map((book) => new BookResponseDTO(book))
        : [];
  }
}
