import { DateUtils } from './date.utils';
import { DateFormatEnum } from '../enums/dateformat.enum';

describe('Suite tests DateUtils', () => {
  describe('Suite tests formatDate', () => {
    it('should be return string date formated DateFormatEnum.YYYY_MM_DD', () => {
      const format = DateUtils.formatDate(
        new Date('2021-02-15 21:07'),
        DateFormatEnum.YYYY_MM_DD,
      );
      expect(format).toEqual('2021-02-15');
    });
    it('should be return string date formated DateFormatEnum.YYYY_MM_DD_HH_MM', () => {
      console.log(new Date('02-15-2021 21:07'));
      const format = DateUtils.formatDate(
        new Date('02-15-2021 21:07'),
        DateFormatEnum.YYYY_MM_DD_HH_MM,
      );
      expect(format).toEqual('2021-02-15 21:07');
    });
  });
  describe('Suite tests stringToDate', () => {
    it('should be return date instance', () => {
      const format = DateUtils.stringToDate(
        '02-15-2021 21:07',
        DateFormatEnum.YYYY_MM_DD,
      );
      expect(format).toEqual(new Date('2021-02-15 21:07'));
    });
    it('should be return date instance format brazillian culture', () => {
      const format = DateUtils.stringToDate(
        '2021-02-15 21:07:00',
        DateFormatEnum.DD_MM_YYYY_HH_MM_SS,
      );
      expect(format).toEqual(new Date('02-15-2021 21:07'));
    });
  });
  describe('Suite tests subtractDateToString', () => {
    it('should be return (date - 1 day) instance', () => {
      const format = DateUtils.subtractDateToString(
        '02-15-2021 21:07',
        1,
        'day',
        DateFormatEnum.YYYY_MM_DD_HH_MM,
      );
      expect(format).toEqual('2021-02-14 21:07');
    });
  });
  describe('Suite tests addDateToString', () => {
    it('should be return (date + 1 day) instance DateFormatEnum.YYYY_MM_DD_HH_MM', () => {
      const format = DateUtils.addDateToString(
        '02-15-2021 21:07',
        1,
        'day',
        DateFormatEnum.YYYY_MM_DD_HH_MM,
      );
      expect(format).toEqual('2021-02-16 21:07');
    });
    it('should be return (date + 1 day) instance DateFormatEnum.YYYY_MM_DD_HH_MM_SS', () => {
      const format = DateUtils.addDateToString(
        '02-15-2021 21:07',
        1,
        'day',
        DateFormatEnum.YYYY_MM_DD_HH_MM_SS,
      );
      expect(format).toEqual('2021-02-16 21:07:00');
    });
  });
});
