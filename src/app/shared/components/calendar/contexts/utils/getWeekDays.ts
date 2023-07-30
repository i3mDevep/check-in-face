import {
  addDays,
  differenceInDays,
  eachDayOfInterval,
  endOfMonth,
  lastDayOfWeek,
  startOfMonth,
  startOfWeek
} from "date-fns";

function getWeekDays(selectedDate: Date, size: number) {
  function getMonthWeeks(date: Date, { forceSixWeeks = false } = {}) {
    const monthFirstDate = startOfMonth(date);
    const monthLastDate = endOfMonth(date);

    const start = forceSixWeeks ? startOfWeek(monthFirstDate) : monthFirstDate;
    let end = forceSixWeeks
      ? lastDayOfWeek(addDays(monthLastDate, 2))
      : monthLastDate;

    const totalOfDays = differenceInDays(end, start);
    if (totalOfDays !== 41) {
      end = lastDayOfWeek(addDays(end, 2));
    }

    return eachDayOfInterval({ start, end });
  }

  const days = getMonthWeeks(selectedDate, { forceSixWeeks: true }).map(
    (date: Date) => date
  );

  const weekly = (_month: Date[], _size: number) =>
    _month.reduce(
      (a, _b, index: number, group: Date[]) =>
        !(index % _size) ? a.concat([group.slice(index, index + _size)]) : a,
      [] as Date[][]
    );

  return weekly(days, size);
}

export default getWeekDays;
