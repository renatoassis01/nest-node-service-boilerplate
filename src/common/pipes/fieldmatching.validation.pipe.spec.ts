import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { FieldMatchingValidationPipe } from './fieldmatching.validation.pipe';

class MyModel {
  name: string;
  lastname: string;
}

let pipe: FieldMatchingValidationPipe<MyModel>;

beforeEach(() => {
  pipe = new FieldMatchingValidationPipe<MyModel>(['lastname', 'name']);
});

describe('SMOKE TEST FieldMatchingValidationPipe', () => {
  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });
});

describe('Suite Test for FieldMatchingValidationPipe query', () => {
  const metadata: ArgumentMetadata = {
    type: 'query',
    metatype: MyModel,
    data: '',
  };

  it('An error should not be thrown CASE 1', () => {
    const request = {
      fieldMatching: 'name',
    };
    expect(pipe.transform(request, metadata)).toEqual(request);
  });

  it('An error should not be thrown CASE 2', () => {
    const request = {
      fieldMatching: 'lastname',
    };
    expect(pipe.transform(request, metadata)).toEqual(request);
  });

  it('An error should be thrown CASE 1', () => {
    const request = {
      fieldMatching: 'age',
    };
    expect(() => pipe.transform(request, metadata)).toThrowError(
      BadRequestException,
    );
  });

  it('An error should be thrown CASE 2', () => {
    const request = {
      fieldMatching: 'age',
    };
    expect(() => pipe.transform(request, metadata)).toThrowError(
      'These are the values allowed for the fieldMatching property: lastname,name',
    );
  });
});

describe('Suite Test for FieldMatchingValidationPipe body', () => {
  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: MyModel,
    data: '',
  };

  it('An error should not be thrown CASE 1', () => {
    const request = {
      fieldMatching: 'name',
    };
    expect(pipe.transform(request, metadata)).toEqual(request);
  });

  it('An error should not be thrown CASE 2', () => {
    const request = {
      fieldMatching: 'lastname',
    };
    expect(pipe.transform(request, metadata)).toEqual(request);
  });

  it('An error should be thrown CASE 1', () => {
    const request = {
      fieldMatching: 'age',
    };
    expect(() => pipe.transform(request, metadata)).toThrowError(
      BadRequestException,
    );
  });

  it('An error should be thrown CASE 2', () => {
    const request = {
      fieldMatching: 'age',
    };
    expect(() => pipe.transform(request, metadata)).toThrowError(
      'These are the values allowed for the fieldMatching property: lastname,name',
    );
  });
});
