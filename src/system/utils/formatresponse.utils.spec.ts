import { IGetByFiltersResult } from '../../common/interfaces/getbyfiltersresult';
import { FormatReponseUtils } from './formatresponse.utils';

const data: IGetByFiltersResult = {
  count: 1,
  page: 1,
  limit: 20,
  totalPages: 2,
  data: [
    {
      name: 'todo',
      done: true,
    },
  ],
};

const data2 = {
  name: 'todo',
  done: true,
};

const resultExpect = { data: { name: 'todo', done: true } };

describe('Suite test for Format', () => {
  it('format response with paginator', () => {
    const result = FormatReponseUtils.format(data);
    expect(data).toEqual(result);
  });
  it('format response simple object ', () => {
    const result = FormatReponseUtils.format(data2);
    expect(result).toEqual(resultExpect);
  });

  it('format response empty object CASE 1', () => {
    const result = FormatReponseUtils.format();
    expect(result).toBeUndefined();
  });
  it('format response empty object CASE 2', () => {
    const result = FormatReponseUtils.format({});
    expect(result).toEqual({ data: {} });
  });
});
