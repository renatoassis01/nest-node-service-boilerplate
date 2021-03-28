import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { FakerUtils } from '../../../common/utils/faker.utils';
import { getDatabaseConfigConnectionQA } from '../../../config/database/connection';
import { BookModel } from '../models/book.model';
import { BookModelBuilder } from '../utils/builders/book.model.builder';
import { BookRepository } from './book.repository';

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

describe('Suite test BaseRepository', () => {
  let bookRepository: BookRepository;

  beforeAll(async () => {
    const databaseOptions = getDatabaseConfigConnectionQA();
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...databaseOptions,
          entities: [BookModel],
        }),
        TypeOrmModule.forFeature([BookRepository]),
      ],
      providers: [BookRepository],
    }).compile();
    bookRepository = moduleRef.get<BookRepository>(BookRepository);
  });

  afterEach(async () => {
    //see https://stackoverflow.com/a/5972738/925151
    await getConnection().manager.clear(BookModel);
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it('must find a book by name', async () => {
    const stored = await bookRepository.store(book.tenantId, book.userId, book);
    const result = await bookRepository.findByName(stored.name);
    expect(result.name).toEqual(stored.name);
  });

  it('must not find a book', async () => {
    await bookRepository.store(book.tenantId, book.userId, book);
    const result = await bookRepository.findByName(
      FakerUtils.faker().random.word(),
    );
    expect(result).toBeUndefined();
  });
});
