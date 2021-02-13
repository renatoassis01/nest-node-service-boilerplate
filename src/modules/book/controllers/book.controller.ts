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
import { TenantId } from '../../../common/utils/decorators/tenantId.decorator';
import { GetAllBookRequestDTO } from '../dtos/request/getall.book.dto';
import { GetAllBookResponseDTO } from '../dtos/response/getall.book.dto';
import { UpdateBookRequestDTO } from '../dtos/request/update.book.dto';
import { UserId } from '../../../common/utils/decorators/userId.decorator';

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
  description: 'Validation failed (tenantid  is expected)',
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
  @ApiResponse({ status: 404, description: 'Not found' })
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
    description: 'The record has been successfully return',
    type: GetAllBookResponseDTO,
  })
  async getAll(
    @TenantId() tenantId: string,
    @Query() filters: GetAllBookRequestDTO,
  ): Promise<GetAllBookResponseDTO> {
    console.log(filters.withDeleted);
    const result = await this.bookService.getAll(tenantId, filters);
    return new GetAllBookResponseDTO(result);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully return',
  })
  @ApiResponse({ status: 404, description: 'Forbidden.' })
  async delete(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<any> {
    return await this.bookService.getById(tenantId, id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully return',
  })
  @ApiResponse({ status: 404, description: 'Forbidden.' })
  async update(
    @TenantId() tenantId: string,
    @UserId() userId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() update: UpdateBookRequestDTO,
  ): Promise<any> {
    return await this.bookService.update(tenantId, userId, id, update);
  }
}
