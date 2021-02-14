import { Validator } from 'class-validator';
import { BookModelBuilder } from '../../utils/builders/book.model.builder';
import { CreateBookRequestDTO } from './create.book.dto';
const validator = new Validator();
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

describe('Suite tests CreateBookRequestDTO', () => {
  it('should true dto whitout errors', () => {
    const createBookDTO = new CreateBookRequestDTO();
    createBookDTO.name = book.name;
    createBookDTO.author = book.author;
    createBookDTO.isbn = book.isbn;
    return validator.validate(createBookDTO).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
  it('should true dto whith errors', () => {
    const createBookDTO = new CreateBookRequestDTO();
    createBookDTO.name = book.name;
    createBookDTO.isbn = book.isbn;
    return validator.validate(createBookDTO).then((errors) => {
      expect(errors.length).toBeLessThanOrEqual(1);
    });
  });
});
