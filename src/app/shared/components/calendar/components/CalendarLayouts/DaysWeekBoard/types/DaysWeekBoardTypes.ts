import { CalendarSlots, SlotOptions } from "../../../../types/calendar";

export interface DaysWeekBoardProps<S> extends CalendarSlots<S> {
  days: Date[];
  neverHighlight?: boolean;
  selectedDate?: Date;
  onClickDay?: (day: Date) => void;
  optionSlot: SlotOptions;
}
