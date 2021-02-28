import { IBuildPaginetedOptions } from '../interfaces/buildpaginetedoptions';
import {
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_PAGINATION_SIZE,
} from '../constants/constants';
import { PaginationUtils } from './pagination.utils';

const data = {
  name: 'name',
  done: true,
};

describe('Suite teste PaginationUtils', () => {
  describe('Tests function buildPaginatedGetAll', () => {
    it('call function with all parameters', () => {
      const buildOptions: IBuildPaginetedOptions = {
        data: [data],
        count: 1,
        page: 1,
        size: 1,
      };
      const result = PaginationUtils.buildPaginatedGetAll(buildOptions);
      expect(result.totalPages).not.toBeUndefined();
      expect(result.count).not.toBeUndefined();
      expect(result.limit).not.toBeUndefined();
      expect(result.page).not.toBeUndefined();
      expect(result.data).toHaveLength(1);
    });
    it('call function with default parameters', () => {
      const buildOptions: IBuildPaginetedOptions = {
        data: [data],
        count: 1,
      };
      const result = PaginationUtils.buildPaginatedGetAll(buildOptions);
      expect(result.limit).toEqual(DEFAULT_PAGINATION_SIZE);
      expect(result.page).toEqual(DEFAULT_PAGINATION_PAGE);
    });
  });
  describe('Tests function getTotalPages', () => {
    it('must be a integer number', () => {
      const result = PaginationUtils.getTotalPages(1, 3);
      expect(Number.isInteger(result)).toEqual(true);
    });
  });
  describe('Tests function getSkip', () => {
    it('get skip', () => {
      const page = 3;
      const result = PaginationUtils.getSkip(1, page);
      expect(result).toEqual(page - 1);
    });
  });
  describe('Tests function getTakeAndSkip', () => {
    it('call function with default parameters', () => {
      const result = PaginationUtils.getTakeAndSkip();
      expect(result.skip).toEqual(0);
      expect(result.take).toEqual(DEFAULT_PAGINATION_SIZE);
    });
  });
});
