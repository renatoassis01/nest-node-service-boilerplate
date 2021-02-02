import {
  Body,
  Controller,
  Delete,
  Get,
  Head,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookRequestDTO } from '../dtos/request/create.book.request.dto';
import { BookService } from '../services/book.service';
import { BookResponseDTO } from '../dtos/response/book.response.dto';

@ApiTags('books')
@ApiHeader({
  name: 'tenantId',
  description: 'TenantId',
  required: true,
})
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body() createBookDto: CreateBookRequestDTO,
  ): Promise<BookResponseDTO> {
    const book = await this.bookService.create(createBookDto);
    return new BookResponseDTO(book);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully return',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  async find(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.bookService.find(id);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully return',
  })
  @ApiResponse({ status: 404, description: 'Forbidden.' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.bookService.find(id);
  }
}
