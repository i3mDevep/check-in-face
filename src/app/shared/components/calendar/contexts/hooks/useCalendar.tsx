import { useContext } from "react";

import {
  CalendarDispatchContext,
  CalendarStateContext
} from "../providers/CalendarProvider";

export const useCalendarState = () => {
  const context = useContext(CalendarStateContext);
  if (!context) {
    throw new Error("Use useCalendarState hook inside CalendarProvider.");
  }
  return context;
};

export const useCalendarDispatch = () => {
  const context = useContext(CalendarDispatchContext);

  if (!context) {
    throw new Error("Use useCalendarDispatch hook inside CalendarProvider.");
  }
  return context;
};
