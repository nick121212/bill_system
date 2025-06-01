import dayjs from 'dayjs';

export enum DateType {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year'
}

export const getDateRanges = (
  dateType: DateType,
): {
  currentRange: string[];
  previousRange: string[];
} => {
  let currentRange: dayjs.Dayjs[] = [];
  let previousRange: dayjs.Dayjs[] = [];

  switch (dateType) {
    case 'day':
      const todayStart = dayjs().startOf('day');
      const todayEnd = dayjs().endOf('day');
      const yesterdayStart = dayjs().subtract(1, 'day').startOf('day');
      const yesterdayEnd = dayjs().subtract(1, 'day').endOf('day');
      currentRange = [todayStart, todayEnd];
      previousRange = [yesterdayStart, yesterdayEnd];
      break;
    case 'week':
      const thisWeekStart = dayjs().startOf('week');
      const thisWeekEnd = dayjs().endOf('week');
      const lastWeekStart = dayjs().subtract(1, 'week').startOf('week');
      const lastWeekEnd = dayjs().subtract(1, 'week').endOf('week');
      currentRange = [thisWeekStart, thisWeekEnd];
      previousRange = [lastWeekStart, lastWeekEnd];
      break;
    case 'month':
      const thisMonthStart = dayjs().startOf('month');
      const thisMonthEnd = dayjs().endOf('month');
      const lastMonthStart = dayjs().subtract(1, 'month').startOf('month');
      const lastMonthEnd = dayjs().subtract(1, 'month').endOf('month');
      currentRange = [thisMonthStart, thisMonthEnd];
      previousRange = [lastMonthStart, lastMonthEnd];
      break;
    default:
      break;
  }

  return {
    currentRange: currentRange.map((date) =>
      date.format('YYYY-MM-DD HH:mm:ss'),
    ),
    previousRange: previousRange.map((date) =>
      date.format('YYYY-MM-DD HH:mm:ss'),
    ),
  };
};
