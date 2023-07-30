import { useCalendarDispatch, useCalendarState } from "../../../contexts";
import { CalendarHeaderDays } from "../CalendarHeaderDays";
import { DaysWeekBoard, DaysWeekBoardProps } from "../DaysWeekBoard";

export const CalendarLayoutWeekBase = <S,>(props: DaysWeekBoardProps<S>) => (
  <>
    <CalendarHeaderDays />
    <DaysWeekBoard {...props} />
  </>
);

export const CalendarLayoutWeek = <S,>(
  props: Omit<DaysWeekBoardProps<S>, "days" | "optionSlot">
) => {
  const { daysInWeek, selectedDate } = useCalendarState();
  const { changeSelectDayInView } = useCalendarDispatch();

  return (
    <CalendarLayoutWeekBase
      days={daysInWeek}
      selectedDate={selectedDate}
      optionSlot="week"
      onClickDay={changeSelectDayInView}
      {...props}
    />
  );
};
