import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ValidationPipe } from '../../../system/pipes/validator.pipe';
import { BookService } from '../services/book.service';
import { BookModelBuilder } from '../utils/builders/book.model.builder';
import { BookController } from './book.controller';
import { CreateBookRequestDTO } from '../dtos/request/create.book.dto';
import { BookRepository } from '../repositories/book.repository';
import { BookResponseDTO } from '../dtos/response/book.dto';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { FakerUtils } from '../../../common/utils/faker.utils';
import { UpdateBookRequestDTO } from '../dtos/request/update.book.dto';

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

const createBookDTO = new CreateBookRequestDTO();
createBookDTO.name = book.name;
createBookDTO.author = book.author;
createBookDTO.isbn = book.isbn;

const emptyResultGetAll = {
  count: 0,
  limit: 20,
  page: 1,
  totalPages: 1,
  data: [],
};

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
            getById: jest.fn(),
            getAll: jest.fn(),
            deleteById: jest.fn(),
            updateById: jest.fn(),
            findByName: jest.fn(),
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
    app.close();
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

      const servicepy = jest.spyOn(bookService, 'create');

      bookRepository.create = jest
        .fn()
        .mockResolvedValue(new Promise((resolve) => resolve(book)));

      await request(app.getHttpServer())
        .post('/books')
        .send(createBookDTO)
        .set('userid', book.userId)
        .set('usertenantid', book.tenantId)
        .expect(HttpStatus.CREATED);

      expect(servicepy).toBeCalled();
    });
  });
  describe('GET /books/get-by-id/{id}', () => {
    it('should return Book not found', async () => {
      await expect(async () => {
        const servicepy = jest.spyOn(bookService, 'getById');
        bookRepository.getById = jest
          .fn()
          .mockResolvedValue(new Promise((resolve) => resolve(undefined)));
        await bookController.getById(book.tenantId, book.id);
        expect(servicepy).toBeCalled();
      }).rejects.toThrow('Book not found');
    });

    it('should return a Book', async () => {
      jest
        .spyOn(bookRepository, 'getById')
        .mockResolvedValue(new Promise((resolve) => resolve(book)));
      const result = await request(app.getHttpServer())
        .get(`/books/get-by-id/${FakerUtils.faker().random.uuid()}`)
        .set('userid', book.userId)
        .set('usertenantid', book.tenantId)
        .expect(HttpStatus.OK);

      expect(result.body).toEqual(new BookResponseDTO(book));
    });
  });
  describe('GET /books/get-all', () => {
    it('should not book not found', async () => {
      jest
        .spyOn(bookRepository, 'getAll')
        .mockResolvedValue(
          new Promise((resolve) => resolve(<any>emptyResultGetAll)),
        );
      const result = await request(app.getHttpServer())
        .get('/books/get-all')
        .set('userid', book.userId)
        .set('usertenantid', book.tenantId)
        .expect(HttpStatus.OK);

      expect(result.body).toEqual(emptyResultGetAll);
    });
  });
  describe('PUT /books', () => {
    it('should updated a book', async () => {
      const updateBookDTO = new UpdateBookRequestDTO();
      updateBookDTO.name = book.name;
      updateBookDTO.author = book.author;
      updateBookDTO.isbn = book.isbn;

      const servicepy = jest.spyOn(bookService, 'update');

      jest
        .spyOn(bookRepository, 'updateById')
        .mockResolvedValue(new Promise((resolve) => resolve(book)));
      const result = await request(app.getHttpServer())
        .put(`/books/${book.id}`)
        .set('userid', book.userId)
        .set('usertenantid', book.tenantId)
        .send(updateBookDTO)
        .expect(HttpStatus.OK);
      expect(servicepy).toBeCalled();
      expect(result.body).toEqual(new BookResponseDTO(book));
    });
    it('should book not found', async () => {
      const updateBookDTO = new UpdateBookRequestDTO();
      updateBookDTO.name = book.name;
      updateBookDTO.author = book.author;
      updateBookDTO.isbn = book.isbn;
      await expect(async () => {
        const servicepy = jest.spyOn(bookService, 'update');
        bookRepository.updateById = jest
          .fn()
          .mockResolvedValue(new Promise((resolve) => resolve(false)));
        await bookController.update(
          book.tenantId,
          book.userId,
          book.id,
          updateBookDTO,
        );
        expect(servicepy).toBeCalled();
      }).rejects.toThrow('Book not found');
    });
  });
  describe('Delete /books', () => {
    it('should deleted a book', async () => {
      const servicepy = jest.spyOn(bookService, 'deleteById');

      jest
        .spyOn(bookRepository, 'deleteById')
        .mockResolvedValue(new Promise((resolve) => resolve(true)));
      const result = await request(app.getHttpServer())
        .delete(`/books/${book.id}`)
        .set('userid', book.userId)
        .set('usertenantid', book.tenantId)
        .expect(HttpStatus.OK);
      expect(servicepy).toBeCalled();
      expect(result.body).toEqual({});
    });
    it('should return Book not found', async () => {
      await expect(async () => {
        const servicepy = jest.spyOn(bookRepository, 'deleteById');
        bookRepository.deleteById = jest
          .fn()
          .mockResolvedValue(new Promise((resolve) => resolve(false)));
        await bookController.deleteById(book.tenantId, book.id);
        expect(servicepy).toBeCalled();
      }).rejects.toThrow('Book not found');
    });
  });
});
