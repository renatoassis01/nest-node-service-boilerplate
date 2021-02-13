import 'reflect-metadata';
import { TransformUtils } from './transform.utils';

describe('Suite tests TransformUtils', () => {
  describe('Suite tests TransformUtils.ToBoolean', () => {
    it('Should true if for a valid CASE 1', () => {
      expect(TransformUtils.ToBoolean(true)).toEqual(true);
    });
    it('Should true if for a valid CASE 2', () => {
      expect(TransformUtils.ToBoolean(false)).toEqual(false);
    });
    it('Should true if for a valid CASE 3', () => {
      expect(TransformUtils.ToBoolean('true')).toEqual(true);
    });
    it('Should true if for a valid CASE 4', () => {
      expect(TransformUtils.ToBoolean('false')).toEqual(false);
    });
    it('Should false for a value not valid CASE 1', () => {
      expect(TransformUtils.ToBoolean(undefined)).toEqual(undefined);
    });
    it('Should false for a value not valid CASE 2', () => {
      expect(TransformUtils.ToBoolean('value')).toEqual('value');
    });
  });
});
