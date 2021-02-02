import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookRequestDTO } from './book.request.dto';
import { BookService } from './book.service';

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
  async create(@Body() createBookDto: CreateBookRequestDTO): Promise<any> {
    return await this.bookService.create(createBookDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully return',
  })
  @ApiResponse({ status: 404, description: 'Forbidden.' })
  async find(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.bookService.find(id);
  }
}
