import { layoutOptions, useCalendarDispatch } from "../../contexts";
import { CalendarIndicatorBase } from "./CalendarIndicatorBase";

export function CalendarIndicator() {
  const { setStateCalendar } = useCalendarDispatch();
  const handleClickToday = () => {
    setStateCalendar((prev) => ({
      ...prev,
      selectedDate: new Date(),
      layout: layoutOptions.DAY
    }));
  };

  return (
    <CalendarIndicatorBase
      date={new Date()}
      showButtonToday
      onClickToday={handleClickToday}
    />
  );
}
