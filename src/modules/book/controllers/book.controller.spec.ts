import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ValidationPipe } from '../../../common/utils/pipes/validator.pipe';
import { BookService } from '../services/book.service';
import { BookModelBuilder } from '../utils/builders/book.model.builder';
import { BookController } from './book.controller';
import { CreateBookRequestDTO } from '../dtos/request/create.book.dto';
import { BookRepository } from '../repository/book.repository';
import { BookResponseDTO } from '../dtos/response/book.dto';
import * as request from 'supertest';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

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
          provide: BookRepository,
          useValue: {},
        },
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    bookService = moduleRef.get<BookService>(BookService);
    bookController = moduleRef.get<BookController>(BookController);
    bookRepository = await moduleRef.resolve<BookRepository>(BookRepository);
  });

  describe('create', () => {
    it('should return an book', async () => {
      const createBookDTO = new CreateBookRequestDTO();
      createBookDTO.name = book.name;
      createBookDTO.author = book.author;
      createBookDTO.isbn = book.isbn;

      bookService.create = jest
        .fn()
        .mockReturnValue(new Promise((resolve) => resolve(book)));

      bookRepository.create = jest
        .fn()
        .mockResolvedValue(new Promise((resolve) => resolve(book)));

      const result = await bookController.create(
        book.tenantId,
        book.userId,
        createBookDTO,
      );

      expect(result).toEqual(new BookResponseDTO(book));
    });
    // it('should return bad request', async () => {
    //   const createBookDTO = new CreateBookRequestDTO();
    //   createBookDTO.name = book.name;
    //   createBookDTO.author = book.author;

    //   jest
    //     .spyOn(bookService, 'create')
    //     .mockResolvedValueOnce(new Promise((resolve) => resolve(book)));

    //   const result = await request(app.getHttpServer())
    //     .post('/books')
    //     .set('userid', book.userId)
    //     .set('tenantid', book.tenantId);

    //   console.log(result);
    //   expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
    // });
  });
});
