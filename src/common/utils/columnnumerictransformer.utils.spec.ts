import { ColumnNumericTransformerUtils } from './columnnumerictransformer.utils';

describe('Suite teste class transform ColumnNumericTransformerUtils', () => {
  const column = new ColumnNumericTransformerUtils();

  it('should be transform string to float', () => {
    expect(column.from('2.3333333')).toBe(2.3333333);
    expect(column.from('5')).toBe(5);
    expect(column.from('18000000000000.77')).toBe(18000000000000.77);
    expect(column.from('0.7')).toBe(0.7);
    expect(column.from('0.777777')).toBe(0.777777);
  });
  it('must not transform string to number', () => {
    expect(column.from('string')).toBe('string');
    expect(column.from(Infinity)).toBe(Infinity);
    expect(column.from(null)).toBe(null);
    expect(column.from(undefined)).toBe(undefined);
    expect(column.from('100000000000000.99')).toBe('100000000000000.99');
  });
});

//
