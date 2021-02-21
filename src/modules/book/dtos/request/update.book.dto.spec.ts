import { Validator } from 'class-validator';
import { UpdateBookRequestDTO } from './update.book.dto';
const validator = new Validator();

describe('Suite tests CreateBookRequestDTO', () => {
  it('should true dto whitout errors', () => {
    const updateBookDTO = new UpdateBookRequestDTO();
    return validator.validate(updateBookDTO).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
});
