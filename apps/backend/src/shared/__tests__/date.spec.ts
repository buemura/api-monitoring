import { getDateDiff } from '../date';

describe('Date test suite', () => {
  describe('getDateDiff', () => {
    it('should return 5000', () => {
      const date1 = new Date('2023-05-14T00:03:35.857Z');
      const date2 = new Date('2023-05-14T00:03:30.857Z');
      const result = getDateDiff(date1, date2);
      expect(result).toEqual(5000);
    });
  });
});
