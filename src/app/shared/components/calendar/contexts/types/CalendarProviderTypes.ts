import { ReactNode } from "react";

export enum layoutOptions {
  YEAR = "year",
  MONTH = "month",
  WEEK = "week",
  DAY = "day"
}

export type StateCalendarContext = {
  allowViewPicker: boolean;
  selectedDate: Date;
  weeks: Date[][];
  monthly: Date[][];
  daysInWeek: Date[];
  layout: layoutOptions;
  memoryLayout: layoutOptions | undefined;
  prevDay: Date | undefined;
  layoutOptionsAllow?: layoutOptions[]
};

export interface CalendarProps {
  children: ReactNode;
  allowViewPicker?: boolean;
  defaultLayout?: layoutOptions;
  layoutOptionsAllow?: layoutOptions[]
}

export type DispatchCalendarContext = {
  setPrevDay: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setStateCalendar: React.Dispatch<React.SetStateAction<StateCalendarContext>>;
  setMemoryLayout: React.Dispatch<
    React.SetStateAction<layoutOptions | undefined>
  >;
  changeSelectDayInView: (day: Date) => void;
};
