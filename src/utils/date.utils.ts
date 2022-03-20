import { format, sub } from 'date-fns';

export const formatDate = (formatString: string, date?: Date) => {
  if (date) {
    return format(new Date(date), formatString);
  }
  return '';
};

export const substractDaysFromDate = (date: Date, days: number) => {
  return sub(date, { days });
};

export const getEventStatusByStartDate = (startDate: number) => {
  const today = new Date();
  const previousDate = substractDaysFromDate(today, 30).getTime();

  if (startDate < previousDate) {
    return 'past';
  }

  if (startDate > today.getTime()) {
    return 'upcoming';
  }

  if (startDate > previousDate && startDate <= today.getTime()) {
    return 'ongoing';
  }
};

export const getEventDaysLeft = (startDate?: number) => {
  if (startDate) {
    const today = new Date().getTime();
    const difference = today - startDate;

    if (difference > 0) {
      return Math.round(30 - difference / (1000 * 3600 * 24));
    }
    return 30;
  }
  return 0;
};
