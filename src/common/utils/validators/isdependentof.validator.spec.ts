import { IsNumber, IsOptional, Validator } from 'class-validator';
import { IsDependentOf } from './isdependentof.validator';

const validator = new Validator();

class MyDTO {
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsDependentOf<MyDTO>(['name', 'age'])
  @IsOptional()
  lastname?: string;
}

describe('Suite teste class validator IsDependentOf()', () => {
  it('should not return an error because the property has been filled CASE 1', () => {
    const model = new MyDTO();
    model.name = 'name';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });

  it('should not return an error because the property has been filled CASE 2', () => {
    const model = new MyDTO();
    model.age = 20;
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });

  it('should not return an error because the property has been filled CASE 3', () => {
    const model = new MyDTO();
    model.name = 'name';
    model.age = 20;
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });

  it('should not return an error because the property has been filled CASE 4', () => {
    const model = new MyDTO();
    model.name = 'name';
    model.age = 20;
    model.lastname = 'lastname';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });

  it('should not return an error', () => {
    const model = new MyDTO();
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });

  it('should return an error because the property has not been filled CASE 1', () => {
    const model = new MyDTO();
    model.lastname = 'lastname';
    return validator.validate(model).then((errors) => {
      expect(errors[0].constraints.isDependentOf).toEqual(
        'The lastname property also depends: name,age',
      );
    });
  });

  it('should return an error because the property has not been filled CASE 2', () => {
    const model = new MyDTO();
    model.age = 20;
    model.lastname = 'lastname';
    return validator.validate(model).then((errors) => {
      expect(errors[0].constraints.isDependentOf).toEqual(
        'The lastname property also depends: name,age',
      );
    });
  });
});
