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
  UsePipes,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StoreBookRequestDTO } from '../dtos/request/store.book.dto';
import { BookService } from '../services/book.service';
import { BookResponseDTO } from '../dtos/response/book.dto';
import { TenantId } from '../../../common/decorators/middlewares/tenantId.decorator';
import { GetByFiltersBookRequestDTO } from '../dtos/request/getbyfilters.book.dto';
import { GetByFiltersBookResponseDTO } from '../dtos/response/getbyfilters.book.dto';
import { UpdateBookRequestDTO } from '../dtos/request/update.book.dto';
import { UserId } from '../../../common/decorators/middlewares/userId.decorator';
import { BookModel } from '../models/book.model';
import { FieldMatchingValidationPipe } from '../../../common/pipes/fieldmatching.validation.pipe';
import { SortParamValidationPipe } from '../../../common/pipes/sortparam.validation.pipe';
import { ApiResponseData } from '../../../common/decorators/swagger/apiresponse.decorator';
import { ApiCreatedResponseData } from '../../../common/decorators/swagger/apicreatedresponse.decorator';
import { ApiTenantHeader } from '../../../common/decorators/swagger/apitenantheader.decorator';
import { ApiUserRequestHeader } from '../../../common/decorators/swagger/apiuserheader.decorator';
import { ErrorReponseDTO } from '../../../common/dtos/response/error.dto';
import { GetBookRequestDTO } from '../dtos/request/get.book.dto';

@ApiTags('books')
@ApiTenantHeader()
@ApiUserRequestHeader()
@ApiUnauthorizedResponse({
  description:
    'Validation failed (tenantid  is expected) or Validation failed (userid  is expected)',
})
@ApiBadRequestResponse({
  description: 'Bad Request',
})
@ApiInternalServerErrorResponse({
  description: 'Sorry we are experiencing technical problems',
})
@ApiExtraModels(ErrorReponseDTO)
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  //@ApiBadRequestFieldMatching<BookModel>(['name', 'isbn', 'author'])
  @ApiResponse({
    status: 200,
    description: 'The records has been successfully return',
    type: GetByFiltersBookResponseDTO,
  })
  @UsePipes(
    new FieldMatchingValidationPipe<BookModel>(['name', 'isbn', 'author']),
    new SortParamValidationPipe<BookModel>(['name', 'isbn', 'author']),
  )
  async index(
    @TenantId() tenantId: string,
    @Query() filters: GetByFiltersBookRequestDTO,
  ): Promise<GetByFiltersBookResponseDTO> {
    const result = await this.bookService.getByFilters(tenantId, filters);
    return new GetByFiltersBookResponseDTO(result);
  }

  @Post()
  @ApiCreatedResponseData({
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
  @ApiResponseData({
    status: 200,
    description: 'The record has been successfully return',
    type: BookResponseDTO,
  })
  @ApiNotFoundResponse({ description: 'Book not found' })
  async get(
    @TenantId() tenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query() filter: GetBookRequestDTO,
  ): Promise<BookResponseDTO> {
    const result = await this.bookService.getById(
      tenantId,
      id,
      filter.withDeleted,
    );
    return new BookResponseDTO(result);
  }

  @Put(':id')
  @ApiResponseData({
    status: 200,
    description: 'The record has been successfully return',
    type: BookResponseDTO,
  })
  @ApiNotFoundResponse({ description: 'Book not found' })
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
  @ApiNotFoundResponse({ description: 'Book not found' })
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
  @ApiNotFoundResponse({ description: 'Book not found' })
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
  @ApiNotFoundResponse({ description: 'Book not found' })
  async enable(
    @TenantId() tenantId: string,
    @UserId() userId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.bookService.enableById(tenantId, userId, id);
  }
}
