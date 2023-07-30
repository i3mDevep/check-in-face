import { useCalendarDispatch, useCalendarState } from "../../../contexts";
import { CalendarHeaderDays } from "../CalendarHeaderDays";
import { DaysMonthLayout } from "./DaysMonthLayout";
import { DaysMonthLayoutProps } from "./types/CalendarLayoutMonthTypes";

export const CalendarLayoutMonthBase = <P,>(props: DaysMonthLayoutProps<P>) => (
  <>
    <CalendarHeaderDays />
    {DaysMonthLayout({
      ...props
    })}
  </>
);

export const CalendarLayoutMonth = <P,>(
  props: Omit<DaysMonthLayoutProps<P>, "weeks">
) => {
  const { weeks, selectedDate } = useCalendarState();
  const { changeSelectDayInView } = useCalendarDispatch();

  return (
    <CalendarLayoutMonthBase
      weeks={weeks}
      onClickDay={changeSelectDayInView}
      selectedDate={selectedDate}
      {...props}
    />
  );
};
