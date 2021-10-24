import { Validator } from 'class-validator';
import { IsCellPhoneBR } from './iscellphonebr.validator';
const validator = new Validator();

class MyDTO {
  @IsCellPhoneBR()
  cellphone: string;
}

describe('Suite teste class validator @IsCellPhoneBR()', () => {
  it('Should NOT return an error. Valid phone CASE 1', () => {
    const model = new MyDTO();
    model.cellphone = '77195761716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
  it('Should NOT return an error. Valid phone CASE 2', () => {
    const model = new MyDTO();
    model.cellphone = '(77)195761716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
  it('Should NOT return an error. Valid phone CASE 3', () => {
    const model = new MyDTO();
    model.cellphone = '(77) 195761716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
  it('Should NOT return an error. Valid phone CASE 4', () => {
    const model = new MyDTO();
    model.cellphone = '(77) 19576-1716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
  it('Should NOT return an error. Valid phone CASE 5', () => {
    const model = new MyDTO();
    model.cellphone = '(77)19576-1716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
  it('Should NOT return an error. Valid phone CASE 6', () => {
    const model = new MyDTO();
    model.cellphone = '7719576-1716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
  it('Should NOT return an error. Valid phone CASE 7', () => {
    const model = new MyDTO();
    model.cellphone = '77 19576-1716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
  it('Should NOT return an error. Valid phone CASE 8', () => {
    const model = new MyDTO();
    model.cellphone = '195761716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
  it('Should NOT return an error. Valid phone CASE 9', () => {
    const model = new MyDTO();
    model.cellphone = '19576-1716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
});

describe('Suite teste class validator @IsCellPhoneBR() with ERROR', () => {
  it('Should return an error. invalid phone CASE 1', () => {
    const model = new MyDTO();
    model.cellphone = '19576-171';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
  it('Should return an error. invalid phone CASE 2', () => {
    const model = new MyDTO();
    model.cellphone = '(719576-1716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
  it('Should return an error. invalid phone CASE 3', () => {
    const model = new MyDTO();
    model.cellphone = '71)9576-1716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
  it('Should NOT return an error. invalid phone CASE 4', () => {
    const model = new MyDTO();
    model.cellphone = '9576-1716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
  it('Should return an error. invalid phone CASE 5', () => {
    const model = new MyDTO();
    model.cellphone = '1)9576-1716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
  it('Should return an error. invalid phone CASE 6', () => {
    const model = new MyDTO();
    model.cellphone = '111195761716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
});

describe('Suite teste class validator @IsCellPhoneBR() without DD', () => {
  class MyDTO {
    @IsCellPhoneBR({ isWithoutDD: true })
    cellphone: string;
  }

  it('Should NOT return an error. Valid phone CASE 1', () => {
    const model = new MyDTO();
    model.cellphone = '195761716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });

  it('Should NOT return an error. Valid phone CASE 2', () => {
    const model = new MyDTO();
    model.cellphone = '19576-1716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });

  it('Should return an error. invalid phone CASE 1', () => {
    const model = new MyDTO();
    model.cellphone = '77 19576-1716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });

  it('Should return an error. invalid phone CASE 2', () => {
    const model = new MyDTO();
    model.cellphone = '9576-1716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });

  it('Should return an error. invalid phone CASE 3', () => {
    const model = new MyDTO();
    model.cellphone = '19576-171';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });

  it('Should return an error. invalid phone CASE 4', () => {
    const model = new MyDTO();
    model.cellphone = '95761716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });

  it('Should return an error. invalid phone CASE 5', () => {
    const model = new MyDTO();
    model.cellphone = '(77)195761716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });

  it('Should return an error. invalid phone CASE 6', () => {
    const model = new MyDTO();
    model.cellphone = '77195761716';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
});

describe('Suite teste class validator @IsCellPhoneBR() with custom message', () => {
  class MyDTO {
    @IsCellPhoneBR({ message: 'phone number invalid' })
    cellphone: string;
  }
  it('Should return an error. invalid phone CASE 1', () => {
    const model = new MyDTO();
    model.cellphone = '7719576171666';
    return validator.validate(model).then((errors) => {
      expect(errors[0].constraints).toEqual({
        isCellPhoneBR: 'phone number invalid',
      });
    });
  });
});

describe('Suite teste class validator @IsCellPhoneBR() with each', () => {
  class MyDTO {
    @IsCellPhoneBR({ each: true })
    cellphone: string[];
  }
  it('Should NOT return an error. Valid phone CASE 1', () => {
    const model = new MyDTO();
    model.cellphone = ['7719576-1716', '(77)19576-1716'];
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });
  it('Should return an error. invalid phone CASE 1', () => {
    const model = new MyDTO();
    model.cellphone = ['(77)19576-1716', '(77)19576171661'];
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
  it('Should return an error. invalid phone CASE 2', () => {
    const model = new MyDTO();
    model.cellphone = ['(77)19576-171611', '(77)195761716611'];
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
  it('Should return an error. invalid phone CASE 3', () => {
    const model = new MyDTO();
    model.cellphone = ['771957617166'];
    return validator.validate(model).then((errors) => {
      expect(errors[0].constraints).toEqual({
        isCellPhoneBR:
          'one or more values of the cellphone property, they are not Brazilian cell phones',
      });
    });
  });
});
