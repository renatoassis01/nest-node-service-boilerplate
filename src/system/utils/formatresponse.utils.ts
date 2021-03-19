import { DataResponse } from '../interfaces/data.response';

export class FormatReponseUtils {
  public static format<T>(data: any): DataResponse<T> {
    if (
      Object.keys(data).includes('count') &&
      Object.keys(data).includes('limit') &&
      Object.keys(data).includes('page') &&
      Object.keys(data).includes('totalPages')
    )
      return {
        count: data.count,
        limit: data.limit,
        page: data.page,
        totalPages: data.totalPages,
        data: data.data,
      };
    return { data: data };
  }
}
