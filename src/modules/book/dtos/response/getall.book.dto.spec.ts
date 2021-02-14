import { IGetAllResult } from '../../../../common/interfaces/getallresult';
import { BookModelBuilder } from '../../utils/builders/book.model.builder';
import { BookResponseDTO } from './book.dto';
import { GetAllBookResponseDTO } from './getall.book.dto';

const book = new BookModelBuilder()
  .withId()
  .withUserId()
  .withTenantId()
  .withCreateAt()
  .withUpdatedAt()
  .withDeletedAt()
  .withName('Memórias Póstumas de Brás Cubas')
  .withISBN('9780195101706')
  .withAuthor('Machado de Assis')
  .build();

const book2 = new BookModelBuilder()
  .withId()
  .withUserId()
  .withTenantId()
  .withCreateAt()
  .withUpdatedAt()
  .withDeletedAt()
  .withName('Dom Casmurro')
  .withISBN('9788560125173')
  .withAuthor('Machado de Assis')
  .build();

const getAllResultRepository: IGetAllResult = {
  count: 2,
  limit: 20,
  page: 1,
  totalPages: 1,
  data: [
    {
      ...book,
    },
    {
      ...book2,
    },
  ],
};

describe('Suite test  GetAllBookResponseDTO', () => {
  it('should return an interface IGetAllResult book', async () => {
    const getAllBookResult = new GetAllBookResponseDTO(getAllResultRepository);
    expect(getAllBookResult.data[0]).toEqual(new BookResponseDTO(book));
    expect(getAllBookResult.data[1]).toEqual(new BookResponseDTO(book2));
  });
});
