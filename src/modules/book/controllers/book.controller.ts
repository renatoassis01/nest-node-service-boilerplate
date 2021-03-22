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
import { StoreBookRequestDTO } from '../dtos/request/store.book.dto';
import { BookService } from '../services/book.service';
import { BookResponseDTO } from '../dtos/response/book.dto';
import { TenantId } from '../../../common/decorators/tenantId.decorator';
import { GetByFiltersBookRequestDTO } from '../dtos/request/getbyfilters.book.dto';
import { GetByFiltersBookResponseDTO } from '../dtos/response/getbyfilters.book.dto';
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

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The records has been successfully return',
    type: GetByFiltersBookResponseDTO,
  })
  async index(
    @TenantId() tenantId: string,
    @Query() filters: GetByFiltersBookRequestDTO,
  ): Promise<GetByFiltersBookResponseDTO> {
    const result = await this.bookService.getByFilters(tenantId, filters);
    return new GetByFiltersBookResponseDTO(result);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully stored',
    type: BookResponseDTO,
  })
  async store(
    @TenantId() tenantId: string,
    @UserId() userId: string,
    @Body() storeBookDTO: StoreBookRequestDTO,
  ): Promise<BookResponseDTO> {
    const book = await this.bookService.store(tenantId, userId, storeBookDTO);
    return new BookResponseDTO(book);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully return',
    type: BookResponseDTO,
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async get(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<BookResponseDTO> {
    const result = await this.bookService.getById(tenantId, id);
    return new BookResponseDTO(result);
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
  async delete(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.bookService.deleteById(tenantId, id);
  }

  @Put(':id/disable')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully removed logical',
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async disable(
    @TenantId() tenantId: string,
    @UserId() userId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.bookService.disableById(tenantId, userId, id);
  }

  @Put(':id/enable')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully restored logical',
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async enable(
    @TenantId() tenantId: string,
    @UserId() userId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.bookService.enableById(tenantId, userId, id);
  }
}
