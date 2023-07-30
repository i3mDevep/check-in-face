import { eachMonthOfInterval, endOfYear, format, startOfYear } from "date-fns";

export const monthly = (_year: Date[]) =>
  _year.reduce((a, b) => {
    const key = format(b, "MMMM yyyy");
    return a?.[key] ? { ...a, [key]: a[key].concat(b) } : { ...a, [key]: [b] };
  }, {} as { [key: string]: Date[] });

function getMonthDays(date: Date) {
  return Object.values(
    monthly(
      eachMonthOfInterval({ start: startOfYear(date), end: endOfYear(date) })
    )
  );
}

export default getMonthDays;
