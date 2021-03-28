import { BookModelBuilder } from '../../utils/builders/book.model.builder';
import { BookResponseDTO } from './book.dto';

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

describe('Suite test  BookResponseDTO', () => {
  it('should return an BookResponseDTO', async () => {
    const bookReponseDTO = new BookResponseDTO(book);
    expect(bookReponseDTO).not.toContain('deletedAt');
  });
});
