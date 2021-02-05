import { Validator } from 'class-validator';
import { IsNumber } from './isnumber.validator';

const validator = new Validator();

class MyDTO {
  @IsNumber()
  age: string | number;
}
describe('Suite teste class validator @IsNumber()', () => {
  it('Should true if number', () => {
    const model = new MyDTO();
    model.age = 1;
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });

  it('Should false if not a number case 1', () => {
    const model = new MyDTO();
    model.age = 'a';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });

  it('Should false if not a number case 2', () => {
    const model = new MyDTO();
    model.age = undefined;
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });

  it('Should false if not a number case 3', () => {
    const model = new MyDTO();
    model.age = NaN;
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
});
