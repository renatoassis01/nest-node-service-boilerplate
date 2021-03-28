import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { GetBookRequestDTO } from './get.book.dto';

describe('Tests for GetBookRequestDTO', () => {
  const target: ValidationPipe = new ValidationPipe({
    transform: true,
    whitelist: true,
  });

  const metadata: ArgumentMetadata = {
    type: 'query',
    metatype: GetBookRequestDTO,
    data: '',
  };

  it('convert withDeleted to boolean', async () => {
    const request = {
      withDeleted: 'true',
    };
    expect(await target.transform(request, metadata)).toEqual({
      withDeleted: true,
    });
  });

  it('not convert withDeleted to boolean', async () => {
    const request = {
      withDeleted: '1',
    };

    await target.transform(request, metadata).catch((err) => {
      expect(err.getResponse().message).toEqual([
        'withDeleted must be a boolean value',
      ]);
    });
  });
});
