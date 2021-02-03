import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookRequestDTO } from '../dtos/request/create.book.dto';
import { BookService } from '../services/book.service';
import { BookResponseDTO } from '../dtos/response/book.dto';
import { TenantId } from 'src/common/utils/decorators/tenantId.decorator';

@ApiTags('books')
@ApiHeader({
  name: 'tenantId',
  description: 'TenantId',
  required: true,
})
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @TenantId() tenantId: string,
    @Body() createBookDTO: CreateBookRequestDTO,
  ): Promise<BookResponseDTO> {
    const book = await this.bookService.create(tenantId, createBookDTO);
    return new BookResponseDTO(book);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully return',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  async find(
    @TenantId() tenantId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<any> {
    return await this.bookService.find(tenantId, id);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully return',
  })
  @ApiResponse({ status: 404, description: 'Forbidden.' })
  async delete(
    @TenantId() tenantId: string,
    @Param('id', ParseIntPipe) id: string,
  ): Promise<any> {
    return await this.bookService.find(tenantId, id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully return',
  })
  @ApiResponse({ status: 404, description: 'Forbidden.' })
  async update(
    @TenantId() tenantId: string,
    @Param('id', ParseIntPipe) id: string,
  ): Promise<any> {
    return await this.bookService.find(tenantId, id);
  }
}
