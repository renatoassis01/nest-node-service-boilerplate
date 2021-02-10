import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ValidationPipe } from '../../../common/utils/pipes/validator.pipe';
import { BookService } from '../services/book.service';
import { BookModelBuilder } from '../utils/builders/book.model.builder';
import { BookController } from './book.controller';
import { CreateBookRequestDTO } from '../dtos/request/create.book.dto';
import { BookRepository } from '../repository/book.repository';
import { BookResponseDTO } from '../dtos/response/book.dto';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';

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

const createBookDTO = new CreateBookRequestDTO();
createBookDTO.name = book.name;
createBookDTO.author = book.author;
createBookDTO.isbn = book.isbn;

describe('Suite tests Book', () => {
  let app: INestApplication;
  let bookController: BookController;
  let bookService: BookService;
  let bookRepository: BookRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        BookService,
        {
          provide: getCustomRepositoryToken(BookRepository),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    bookService = moduleRef.get<BookService>(BookService);
    bookController = moduleRef.get<BookController>(BookController);
    bookRepository = await moduleRef.resolve<BookRepository>(
      getCustomRepositoryToken(BookRepository),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('POST /books', () => {
    it('should return an book', async () => {
      const createBookDTO = new CreateBookRequestDTO();
      createBookDTO.name = book.name;
      createBookDTO.author = book.author;
      createBookDTO.isbn = book.isbn;

      jest
        .spyOn(bookRepository, 'create')
        .mockResolvedValue(new Promise((resolve) => resolve(book)));

      const servicepy = jest.spyOn(bookService, 'create');

      const result = await bookController.create(
        book.tenantId,
        book.userId,
        createBookDTO,
      );

      expect(result).toEqual(new BookResponseDTO(book));
      expect(servicepy).toBeCalledWith(
        book.tenantId,
        book.userId,
        createBookDTO,
      );
    });
    it('An example tests supertest [POST /books]', async () => {
      const createBookDTO = new CreateBookRequestDTO();
      createBookDTO.name = book.name;
      createBookDTO.author = book.author;
      createBookDTO.isbn = book.isbn;

      bookRepository.create = jest
        .fn()
        .mockResolvedValue(new Promise((resolve) => resolve(book)));

      await request(app.getHttpServer())
        .post('/books')
        .send(createBookDTO)
        .set('userid', book.userId)
        .set('usertenantid', book.tenantId)
        .expect(HttpStatus.CREATED);
    });
  });
  describe('GET /books', () => {
    it('should return Book not found', async () => {
      await expect(async () => {
        bookRepository.findById = jest
          .fn()
          .mockResolvedValue(new Promise((resolve) => resolve(undefined)));
        await bookController.findById(book.tenantId, book.id);
      }).rejects.toThrow('Book not found');
    });
  });
});
