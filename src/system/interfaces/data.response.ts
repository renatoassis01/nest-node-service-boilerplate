import { IGetByFiltersResult } from '../../common/interfaces/getbyfiltersresult';

export type DataResponse<T> = Partial<
  Pick<IGetByFiltersResult, 'count' | 'limit' | 'page' | 'totalPages'>
> & { data: T };
