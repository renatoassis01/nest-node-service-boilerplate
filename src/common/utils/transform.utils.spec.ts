import 'reflect-metadata';
import { TransformUtils } from './transform.utils';

const obj1 = {
  key: 'value',
  obj: {
    value: 'true',
  },
};

const obj2 = {
  key: 'value',
  obj: {
    value: 'false',
  },
};

const obj3 = {
  key: 'value',
  obj: {
    value: 'other',
  },
};

describe('Suite tests TransformUtils', () => {
  describe('Suite tests TransformUtils.ToBoolean', () => {
    it('Should true if for a valid CASE 1', () => {
      expect(TransformUtils.ToBoolean(obj1)).toEqual(true);
    });
    it('Should true if for a valid CASE 2', () => {
      expect(TransformUtils.ToBoolean(obj2)).toEqual(false);
    });
    it('Should false for a value not valid CASE 2', () => {
      expect(TransformUtils.ToBoolean(obj3)).toEqual('other');
    });
  });
});
