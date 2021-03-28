import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { BookService } from '../services/book.service';
import { BookModelBuilder } from '../utils/builders/book.model.builder';
import { BookController } from './book.controller';
import { StoreBookRequestDTO } from '../dtos/request/store.book.dto';
import { BookRepository } from '../repositories/book.repository';
import { BookResponseDTO } from '../dtos/response/book.dto';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { FakerUtils } from '../../../common/utils/faker.utils';
import { UpdateBookRequestDTO } from '../dtos/request/update.book.dto';
import { GetBookRequestDTO } from '../dtos/request/get.book.dto';

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

const createBookDTO = new StoreBookRequestDTO();
createBookDTO.name = book.name;
createBookDTO.author = book.author;
createBookDTO.isbn = book.isbn;

const emptyResultGetByFilters = {
  count: 0,
  limit: 20,
  page: 1,
  totalPages: 1,
  data: [],
};

const resultGetByFilters = {
  count: 0,
  limit: 20,
  page: 1,
  totalPages: 1,
  data: [book, book2],
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
            store: jest.fn(),
            getById: jest.fn(),
            getByFilters: jest.fn(),
            deleteById: jest.fn(),
            enableById: jest.fn(),
            disableById: jest.fn(),
            updateById: jest.fn(),
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
      const storeBookDTO = new StoreBookRequestDTO();
      storeBookDTO.name = book.name;
      storeBookDTO.author = book.author;
      storeBookDTO.isbn = book.isbn;

      jest
        .spyOn(bookRepository, 'store')
        .mockResolvedValue(new Promise((resolve) => resolve(book)));

      const servicepy = jest.spyOn(bookService, 'store');

      const result = await bookController.store(
        book.tenantId,
        book.userId,
        storeBookDTO,
      );

      expect(result).toEqual(new BookResponseDTO(book));
      expect(servicepy).toBeCalledWith(
        book.tenantId,
        book.userId,
        storeBookDTO,
      );
    });
    it('An example tests supertest [POST /books]', async () => {
      const createBookDTO = new StoreBookRequestDTO();
      createBookDTO.name = book.name;
      createBookDTO.author = book.author;
      createBookDTO.isbn = book.isbn;

      const servicepy = jest.spyOn(bookService, 'store');

      bookRepository.store = jest
        .fn()
        .mockResolvedValue(new Promise((resolve) => resolve(book)));

      await request(app.getHttpServer())
        .post('/books')
        .send(createBookDTO)
        .set('userid', book.userId)
        .set('tenantid', book.tenantId)
        .expect(HttpStatus.CREATED);

      expect(servicepy).toBeCalled();
    });
  });
  describe('GET /books/{id}', () => {
    it('should return a Book', async () => {
      jest
        .spyOn(bookRepository, 'getById')
        .mockResolvedValue(new Promise((resolve) => resolve(book)));
      const result = await request(app.getHttpServer())
        .get(`/books/${FakerUtils.faker().random.uuid()}`)
        .set('userid', book.userId)
        .set('tenantid', book.tenantId)
        .expect(HttpStatus.OK);

      expect(result.body).not.toBeUndefined();
    });

    it('should return Book not found', async () => {
      const filters = new GetBookRequestDTO();
      await expect(async () => {
        const servicepy = jest.spyOn(bookService, 'getById');
        bookRepository.getById = jest
          .fn()
          .mockResolvedValue(new Promise((resolve) => resolve(undefined)));
        await bookController.get(book.tenantId, book.id, filters);
        expect(servicepy).toBeCalled();
      }).rejects.toThrow('Book not found');
    });
  });
  describe('GET /books', () => {
    it('should return many book', async () => {
      jest
        .spyOn(bookRepository, 'getByFilters')
        .mockResolvedValue(
          new Promise((resolve) => resolve(<any>resultGetByFilters)),
        );
      const result = await request(app.getHttpServer())
        .get('/books')
        .set('userid', book.userId)
        .set('tenantid', book.tenantId)
        .expect(HttpStatus.OK);

      expect(result.body.data.length).toEqual(2);
    });

    it('should not book not found', async () => {
      jest
        .spyOn(bookRepository, 'getByFilters')
        .mockResolvedValue(
          new Promise((resolve) => resolve(<any>emptyResultGetByFilters)),
        );
      const result = await request(app.getHttpServer())
        .get('/books')
        .set('userid', book.userId)
        .set('tenantid', book.tenantId)
        .expect(HttpStatus.OK);

      expect(result.body).toEqual(emptyResultGetByFilters);
    });
  });
  describe('PUT /books/{id}', () => {
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
        .set('tenantid', book.tenantId)
        .send(updateBookDTO)
        .expect(HttpStatus.OK);
      expect(servicepy).toBeCalled();
      expect(result.body).not.toBeUndefined();
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
  describe('DELETE /books', () => {
    it('should deleted a book', async () => {
      const servicepy = jest.spyOn(bookService, 'deleteById');

      jest
        .spyOn(bookRepository, 'deleteById')
        .mockResolvedValue(new Promise((resolve) => resolve(true)));
      await request(app.getHttpServer())
        .delete(`/books/${book.id}`)
        .set('userid', book.userId)
        .set('tenantid', book.tenantId)
        .expect(HttpStatus.OK);
      expect(servicepy).toBeCalled();
    });
    it('should return Book not found', async () => {
      await expect(async () => {
        const servicepy = jest.spyOn(bookRepository, 'deleteById');
        bookRepository.deleteById = jest
          .fn()
          .mockResolvedValue(new Promise((resolve) => resolve(false)));
        await bookController.delete(book.tenantId, book.id);
        expect(servicepy).toBeCalled();
      }).rejects.toThrow('Book not found');
    });
  });

  describe('PUT /books/{id}/enable', () => {
    it('should enable a book', async () => {
      const servicepy = jest.spyOn(bookService, 'enableById');

      jest
        .spyOn(bookRepository, 'enableById')
        .mockResolvedValue(new Promise((resolve) => resolve(true)));
      await request(app.getHttpServer())
        .put(`/books/${book.id}/enable`)
        .set('userid', book.userId)
        .set('tenantid', book.tenantId)
        .expect(HttpStatus.OK);
      expect(servicepy).toBeCalled();
    });
    it('should return Book not found', async () => {
      await expect(async () => {
        const servicepy = jest.spyOn(bookRepository, 'enableById');
        bookRepository.enableById = jest
          .fn()
          .mockResolvedValue(new Promise((resolve) => resolve(false)));
        await bookController.delete(book.tenantId, book.id);
        expect(servicepy).toBeCalled();
      }).rejects.toThrow('Book not found');
    });
  });
  describe('PUT /books/{id}/disable', () => {
    it('should disable a book', async () => {
      const servicepy = jest.spyOn(bookService, 'disableById');

      jest
        .spyOn(bookRepository, 'disableById')
        .mockResolvedValue(new Promise((resolve) => resolve(true)));
      await request(app.getHttpServer())
        .put(`/books/${book.id}/disable`)
        .set('userid', book.userId)
        .set('tenantid', book.tenantId)
        .expect(HttpStatus.OK);
      expect(servicepy).toBeCalled();
    });
    it('should return Book not found', async () => {
      await expect(async () => {
        const servicepy = jest.spyOn(bookRepository, 'disableById');
        bookRepository.enableById = jest
          .fn()
          .mockResolvedValue(new Promise((resolve) => resolve(false)));
        await bookController.delete(book.tenantId, book.id);
        expect(servicepy).toBeCalled();
      }).rejects.toThrow('Book not found');
    });
  });
});
