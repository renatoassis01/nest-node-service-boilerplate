import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { StoreBookRequestDTO } from '../dtos/request/store.book.dto';
import { BookRepository } from '../repositories/book.repository';
import { BookModelBuilder } from '../utils/builders/book.model.builder';
import { BookService } from './book.service';

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

describe('BookService', () => {
  let service: BookService;
  let repository: BookRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getCustomRepositoryToken(BookRepository),
          useValue: {
            create: jest.fn(),
            getById: jest.fn(),
            getAll: jest.fn(),
            deleteById: jest.fn(),
            updateById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    repository = await module.resolve<BookRepository>(
      getCustomRepositoryToken(BookRepository),
    );
  });

  it('should be return a book', async () => {
    const repositorySpy = jest
      .spyOn(repository, 'create')
      .mockResolvedValue(new Promise((resolve) => resolve(book)));
    const createBookDTO = new StoreBookRequestDTO();
    createBookDTO.name = book.name;
    createBookDTO.author = book.author;
    createBookDTO.isbn = book.isbn;
    await service.store(book.tenantId, book.userId, createBookDTO);
    expect(repositorySpy).toBeCalled();
  });
});
