import { Validator } from 'class-validator';
import { IsInteger } from './isinterger.validator';

const validator = new Validator();

class MyDTO {
  @IsInteger()
  age: string | number;
}
describe('Suite teste class validator @IsInteger()', () => {
  it('Should true if number', () => {
    const model = new MyDTO();
    model.age = 1;
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });

  it('Should false if not a number integer', () => {
    const model = new MyDTO();
    model.age = 1.2;
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });

  it('Should false if not a number', () => {
    const model = new MyDTO();
    model.age = 'a';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
});
