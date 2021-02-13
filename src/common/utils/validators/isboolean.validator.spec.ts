import 'reflect-metadata';
import { Transform, Type } from 'class-transformer';
import { IsOptional, Validator } from 'class-validator';
import { TransformUtils } from '../transform.utils';
import { IsBoolean } from './isboolean.validator';

const validator = new Validator();

class MyDTO {
  @Type(() => Boolean)
  @Transform((value) => {
    return TransformUtils.ToBoolean(value);
  })
  @IsBoolean()
  @IsOptional()
  withDeleted?: boolean | any;
}

describe('Suite tests @IsBoolean()', () => {
  it('Should true if for a valid CASE 1', () => {
    const model = new MyDTO();
    model.withDeleted = 'true';

    return validator.validate(model).then((errors) => {
      console.log(model);
      expect(errors.length).toEqual(0);
    });
  });
  it('Should true if for a valid CASE 2', () => {
    const model = new MyDTO();
    model.withDeleted = 'false';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
  it('Should true if for a valid CASE 3', () => {
    const model = new MyDTO();
    model.withDeleted = true;
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
  it('Should true if for a valid CASE 4', () => {
    const model = new MyDTO();
    model.withDeleted = false;
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
  it('Should false for a value not valid CASE 1', () => {
    const model = new MyDTO();
    model.withDeleted = 'a';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
  it('Should false for a value not valid CASE 2', () => {
    const model = new MyDTO();
    model.withDeleted = '';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
  it('Should false for a value not valid CASE 3', () => {
    const model = new MyDTO();
    model.withDeleted = NaN;
    return validator.validate(model).then((errors) => {
      console.log(errors);
      expect(errors.length).toEqual(1);
    });
  });
  it('Should false for a value not valid CASE 4', () => {
    const model = new MyDTO();
    model.withDeleted = 'undefined';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
  it('Should false for a value not valid CASE 5', () => {
    const model = new MyDTO();
    model.withDeleted = 1;
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
});
