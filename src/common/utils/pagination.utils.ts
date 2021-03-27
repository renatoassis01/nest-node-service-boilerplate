import { IBasePaginationDTO } from '../base/interfaces/base.pagination.dto';
import { IBuildPaginetedOptions } from '../interfaces/buildpaginetedoptions';
import { IGetByFiltersResult } from '../interfaces/getbyfiltersresult';
import { IPaginationQuery } from '../interfaces/paginationquery';
import {
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_PAGINATION_SIZE,
} from '../constants/constants';

export class PaginationUtils {
  public static buildPaginatedGetByFilters(
    buildOptions: IBuildPaginetedOptions,
  ): IGetByFiltersResult {
    const limit = buildOptions?.size || DEFAULT_PAGINATION_SIZE;
    const totalPages = PaginationUtils.getTotalPages(buildOptions.count, limit);
    return {
      data: buildOptions.data,
      count: buildOptions.count,
      page: buildOptions?.page || DEFAULT_PAGINATION_PAGE,
      limit,
      totalPages,
    };
  }

  public static getTotalPages(count: number, limit: number): number {
    const numberPages = count / limit;

    if (Number.isInteger(numberPages)) return numberPages;

    return Math.trunc(1 + numberPages);
  }

  public static getTakeAndSkip(
    pagination?: IBasePaginationDTO,
  ): IPaginationQuery {
    const take = pagination?.size || DEFAULT_PAGINATION_SIZE;
    const page = pagination?.page || DEFAULT_PAGINATION_PAGE;
    const skip = PaginationUtils.getSkip(take, page);
    return { take, skip };
  }

  public static getSkip(take: number, page: number): number {
    return take * (page - 1);
  }
}
