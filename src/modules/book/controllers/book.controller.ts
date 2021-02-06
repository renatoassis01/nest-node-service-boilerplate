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
  ApiExtraModels,
  ApiHeader,
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
import { FindAllBookRequestDTO } from '../dtos/request/findall.book.dto';
import { FindAllBookResultResponseDTO } from '../dtos/response/findallresult.book.dto';
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

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully return',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findById(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<any> {
    return await this.bookService.findById(tenantId, id);
  }

  @Get('get-all')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully return',
    type: FindAllBookResultResponseDTO,
  })
  async findAll(
    @TenantId() tenantId: string,
    @Query() filters: FindAllBookRequestDTO,
  ): Promise<FindAllBookResultResponseDTO> {
    const result = await this.bookService.findAll(tenantId, filters);
    return new FindAllBookResultResponseDTO(result);
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
    return await this.bookService.findById(tenantId, id);
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
