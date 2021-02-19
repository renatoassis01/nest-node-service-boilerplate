import { BookModel } from './book.model';

describe('Suite tests for BookModel', () => {
  it('must be OK for requests with tenantid', async () => {
    const bookModel = new BookModel();
    expect(bookModel).toBeDefined();
  });
});
