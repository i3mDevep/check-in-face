import { CalendarSlots } from "../../../../types/calendar";

export interface DaysMonthLayoutProps<S> extends CalendarSlots<S> {
  weeks: Date[][];
  selectedDate?: Date;
  onClickDay?: (day: Date) => void;
}
