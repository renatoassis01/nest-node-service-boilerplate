import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateBookRequestDTO } from '../dtos/request/create.book.dto';
import { BookService } from '../services/book.service';
import { BookResponseDTO } from '../dtos/response/book.dto';
import { TenantId } from '../../../common/decorators/tenantId.decorator';
import { GetAllBookRequestDTO } from '../dtos/request/getall.book.dto';
import { GetAllBookResponseDTO } from '../dtos/response/getall.book.dto';
import { UpdateBookRequestDTO } from '../dtos/request/update.book.dto';
import { UserId } from '../../../common/decorators/userId.decorator';

@ApiTags('books')
@ApiHeaders([
  {
    name: 'tenantid',
    description: 'TenantId',
    required: true,
  },
  {
    name: 'userid',
    description: 'userId',
    required: true,
  },
])
@ApiUnauthorizedResponse({
  description:
    'Validation failed (tenantid  is expected) or Validation failed (userid  is expected)',
})
@ApiBadRequestResponse({
  description: 'Bad Request',
})
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created',
    type: BookResponseDTO,
  })
  async create(
    @TenantId() tenantId: string,
    @UserId() userId: string,
    @Body() createBookDTO: CreateBookRequestDTO,
  ): Promise<BookResponseDTO> {
    const book = await this.bookService.create(tenantId, userId, createBookDTO);
    return new BookResponseDTO(book);
  }

  @Get('get-by-id/:id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully return',
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async getById(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<BookResponseDTO> {
    const result = await this.bookService.getById(tenantId, id);
    return new BookResponseDTO(result);
  }

  @Get('get-all')
  @ApiResponse({
    status: 200,
    description: 'The records has been successfully return',
    type: GetAllBookResponseDTO,
  })
  async getAll(
    @TenantId() tenantId: string,
    @Query() filters: GetAllBookRequestDTO,
  ): Promise<GetAllBookResponseDTO> {
    const result = await this.bookService.getAll(tenantId, filters);
    return new GetAllBookResponseDTO(result);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully return',
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async update(
    @TenantId() tenantId: string,
    @UserId() userId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() update: UpdateBookRequestDTO,
  ): Promise<BookResponseDTO> {
    const result = await this.bookService.update(tenantId, userId, id, update);
    return new BookResponseDTO(result);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async deleteById(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<string> {
    return await this.bookService.deleteById(tenantId, id);
  }
}
