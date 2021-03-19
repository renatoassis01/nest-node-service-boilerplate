import { IGetAllResult } from '../../common/interfaces/getallresult';

export type DataResponse<T> = Partial<
  Pick<IGetAllResult, 'count' | 'limit' | 'page' | 'totalPages'>
> & { data: T };
