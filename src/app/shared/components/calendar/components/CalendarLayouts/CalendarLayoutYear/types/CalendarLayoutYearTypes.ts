import { DateCalendarProps } from "@mui/x-date-pickers";
import { CalendarSlots } from "../../../../types/calendar";

export interface CalendarLayoutYearBaseProps<TDate, S>
  extends CalendarSlots<S> {
  monthly: Date[][];
  calendarProps?: DateCalendarProps<TDate> &
    React.RefAttributes<HTMLDivElement>;
}
