import { isUUID } from './string.utils';

describe('suite tests for string.utils', () => {
  describe('test function isUUID', () => {
    it('should be true uuid valid', () => {
      expect(isUUID('f658f068-d1d2-4ab9-a5af-f89c5209f788')).toEqual(true);
    });
    it('should be false uuid invalid', () => {
      expect(isUUID('f65')).toEqual(false);
    });
  });
});
