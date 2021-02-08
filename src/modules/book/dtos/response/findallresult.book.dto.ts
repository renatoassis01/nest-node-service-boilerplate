import { ApiProperty } from '@nestjs/swagger';
import { BaseFindManyResponseDTO } from '../../../../common/base/dtos/response/basefindmany.dto';
import { IFindManyResult } from '../../../../common/interfaces/findmanyresult';
import { BookResponseDTO } from './book.dto';

export class FindAllBookResultResponseDTO extends BaseFindManyResponseDTO {
  @ApiProperty({ description: 'Books', type: [BookResponseDTO] })
  readonly data: BookResponseDTO[];

  constructor(data: IFindManyResult) {
    super();
    this.count = data.count;
    this.limit = data.limit;
    this.page = data.page;
    this.data =
      data?.data?.length > 0
        ? data.data.map((book) => new BookResponseDTO(book))
        : [];
  }
}
