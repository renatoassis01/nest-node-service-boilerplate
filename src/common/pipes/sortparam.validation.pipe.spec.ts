import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { SortParamValidationPipe } from './sortparam.validation.pipe';

class MyModel {
  name: string;
  lastname: string;
}

let pipe: SortParamValidationPipe<MyModel>;

beforeEach(() => {
  pipe = new SortParamValidationPipe<MyModel>(['lastname', 'name']);
});

describe('SMOKE TEST SortParamValidationPipe', () => {
  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });
});

describe('Suite Test for SortParamValidationPipe query', () => {
  const metadata: ArgumentMetadata = {
    type: 'query',
    metatype: MyModel,
    data: '',
  };

  it('An error should not be thrown CASE 1', () => {
    const request = {
      sortParam: 'name',
    };
    expect(pipe.transform(request, metadata)).toEqual(request);
  });

  it('An error should not be thrown CASE 2', () => {
    const request = {
      sortParam: 'lastname',
    };
    expect(pipe.transform(request, metadata)).toEqual(request);
  });

  it('An error should be thrown CASE 1', () => {
    const request = {
      sortParam: 'age',
    };
    expect(() => pipe.transform(request, metadata)).toThrowError(
      BadRequestException,
    );
  });

  it('An error should be thrown CASE 2', () => {
    const request = {
      sortParam: 'age',
    };
    expect(() => pipe.transform(request, metadata)).toThrowError(
      'These are the values allowed for the sortParam property: lastname,name',
    );
  });
});

describe('Suite Test for SortParamValidationPipe body', () => {
  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: MyModel,
    data: '',
  };

  it('An error should not be thrown CASE 1', () => {
    const request = {
      sortParam: 'name',
    };
    expect(pipe.transform(request, metadata)).toEqual(request);
  });

  it('An error should not be thrown CASE 2', () => {
    const request = {
      sortParam: 'lastname',
    };
    expect(pipe.transform(request, metadata)).toEqual(request);
  });

  it('An error should be thrown CASE 1', () => {
    const request = {
      sortParam: 'age',
    };
    expect(() => pipe.transform(request, metadata)).toThrowError(
      BadRequestException,
    );
  });

  it('An error should be thrown CASE 2', () => {
    const request = {
      sortParam: 'age',
    };
    expect(() => pipe.transform(request, metadata)).toThrowError(
      'These are the values allowed for the sortParam property: lastname,name',
    );
  });
});
