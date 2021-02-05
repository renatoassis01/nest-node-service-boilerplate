import { ApiProperty } from '@nestjs/swagger';
import { BaseFindManyResponseDTO } from '../../../../common/base/dtos/response/basefindmany.dto';
import { IFindManyResult } from '../../../../common/interfaces/findmanyresult';
import { BookResponseDTO } from './book.dto';

export class FindAllBookResultResponseDTO extends BaseFindManyResponseDTO {
  @ApiProperty({ description: 'Books', type: [BookResponseDTO] })
  readonly data: BookResponseDTO[];

  constructor(model: IFindManyResult) {
    super();
    this.count = model.count;
    this.limit = model.limit;
    this.page = model.page;
    this.data =
      model?.data?.length > 0
        ? model.data.map((book) => new BookResponseDTO(book))
        : [];
  }
}
