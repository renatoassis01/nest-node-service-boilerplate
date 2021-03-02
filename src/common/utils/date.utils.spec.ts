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
      const format = DateUtils.formatDate(
        new Date('02-15-2021 21:07'),
        DateFormatEnum.YYYY_MM_DD_HH_MM,
      );
      expect(format).toEqual('2021-02-15 21:07');
    });
    it('should be return string date formated DateFormatEnum.DD_MM_YYYY', () => {
      const format = DateUtils.formatDate(
        new Date('2021-02-15 21:07'),
        DateFormatEnum.DD_MM_YYYY,
      );
      expect(format).toEqual('15-02-2021');
    });
    it('should be return string date formated DateFormatEnum.DD_MM_YYYY_HH_MM', () => {
      const format = DateUtils.formatDate(
        new Date('2021-02-15 21:07'),
        DateFormatEnum.DD_MM_YYYY_HH_MM,
      );
      expect(format).toEqual('15-02-2021 21:07');
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
        DateFormatEnum.DD_MM_YYYY_HH_MM,
      );
      expect(format).toEqual(new Date('02-15-2021 21:07'));
    });
  });
  describe('Suite tests subtractDateToString', () => {
    it('should be return (date - 1 day) instance DateFormatEnum.YYYY_MM_DD_HH_MM', () => {
      const format = DateUtils.subtractDateToString(
        '02-15-2021 21:07',
        1,
        'day',
        DateFormatEnum.YYYY_MM_DD_HH_MM,
      );
      expect(format).toEqual('2021-02-14 21:07');
    });

    it('should be return (date - 1 year) instance DateFormatEnum.YYYY_MM_DD_HH_MM', () => {
      const format = DateUtils.subtractDateToString(
        '02-15-2021',
        1,
        'year',
        DateFormatEnum.YYYY_MM_DD_HH_MM,
      );
      expect(format).toEqual('2020-02-15 00:00');
    });
    it('should be return (date - 1 month) instance DateFormatEnum.YYYY_MM_DD_HH_MM', () => {
      const format = DateUtils.subtractDateToString(
        '2021-02-15 21:07',
        1,
        'month',
        DateFormatEnum.YYYY_MM_DD_HH_MM,
      );
      expect(format).toEqual('2021-01-15 21:07');
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
    it('should be return (date + 1 year) instance DateFormatEnum.YYYY_MM_DD_HH_MM', () => {
      const format = DateUtils.addDateToString(
        '02-15-2021 21:07',
        1,
        'year',
        DateFormatEnum.YYYY_MM_DD_HH_MM,
      );
      expect(format).toEqual('2022-02-15 21:07');
    });
    it('should be return (date + 1 month) instance DateFormatEnum.YYYY_MM_DD_HH_MM', () => {
      const format = DateUtils.addDateToString(
        '2021-03-03 21:00',
        1,
        'month',
        DateFormatEnum.YYYY_MM_DD_HH_MM,
      );
      expect(format).toEqual('2021-04-03 21:00');
    });
    it('should be return (date + 1 day) instance DateFormatEnum.YYYY_MM_DD', () => {
      const format = DateUtils.addDateToString(
        '2021-02-15',
        1,
        'day',
        DateFormatEnum.YYYY_MM_DD,
      );
      expect(format).toEqual('2021-02-16');
    });
    it('should be return (date + 1 year) instance DateFormatEnum.YYYY_MM_DD', () => {
      const format = DateUtils.addDateToString(
        '02-15-2021 23:00',
        1,
        'year',
        DateFormatEnum.YYYY_MM_DD,
      );
      expect(format).toEqual('2022-02-15');
    });
    it('should be return (date + 1 month) instance DateFormatEnum.YYYY_MM_DD', () => {
      const format = DateUtils.addDateToString(
        '02-15-2021 23:00',
        1,
        'month',
        DateFormatEnum.YYYY_MM_DD,
      );
      expect(format).toEqual('2021-03-15');
    });
  });
});
