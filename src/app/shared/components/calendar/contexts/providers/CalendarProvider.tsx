import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";
import { getMonthDays, getWeekDays } from "../utils";

import {
  CalendarProps,
  DispatchCalendarContext,
  layoutOptions,
  StateCalendarContext
} from "../types/CalendarProviderTypes";

const stateDefaultValues = {
  allowViewPicker: false,
  selectedDate: new Date(),
  weeks: [],
  monthly: [],
  daysInWeek: [],
  layout: layoutOptions.YEAR,
  memoryLayout: undefined,
  prevDay: undefined
};

const dispatchDefaultValues = {
  setStateCalendar: () => undefined,
  setMemoryLayout: () => undefined,
  setPrevDay: () => undefined,
  changeSelectDayInView: () => null
};

export const CalendarStateContext =
  createContext<StateCalendarContext | undefined>(stateDefaultValues);

export const CalendarDispatchContext = createContext<
  DispatchCalendarContext | undefined
>(dispatchDefaultValues);

export const CalendarProvider: React.FC<CalendarProps> = ({
  children,
  defaultLayout,
  allowViewPicker
}) => {
  const [stateCalendar, setStateCalendar] = useState<StateCalendarContext>({
    ...stateDefaultValues,
    ...(defaultLayout ? { layout: defaultLayout } : {})
  });
  const [memoryLayout, setMemoryLayout] =
    useState<layoutOptions | undefined>(defaultLayout);
  const [prevDay, setPrevDay] = useState<Date | undefined>(undefined);

  const changeSelectDayInView = useCallback(
    (day: Date) => {
      allowViewPicker &&
        setStateCalendar((prev) => ({
          ...prev,
          selectedDate: day
        }));
    },
    [allowViewPicker]
  );

  useEffect(() => {
    if (stateCalendar.layout !== layoutOptions.DAY)
      setMemoryLayout(stateCalendar.layout);
  }, [stateCalendar.layout]);

  const dispatch = useMemo(
    () => ({
      changeSelectDayInView,
      setStateCalendar,
      setMemoryLayout,
      setPrevDay
    }),
    []
  );

  const dateHelpers = useMemo(
    () => ({
      weeks: getWeekDays(stateCalendar.selectedDate, 7),
      monthly: getMonthDays(stateCalendar.selectedDate),
      daysInWeek: eachDayOfInterval({
        start: startOfWeek(stateCalendar.selectedDate),
        end: endOfWeek(stateCalendar.selectedDate)
      })
    }),
    [stateCalendar.selectedDate]
  );

  const state = useMemo(
    () => ({
      ...stateCalendar,
      ...dateHelpers
    }),
    [stateCalendar, dateHelpers]
  );

  const aux = useMemo(
    () => ({ memoryLayout, prevDay, allowViewPicker: !!allowViewPicker }),
    [memoryLayout, prevDay]
  );

  return (
      <CalendarDispatchContext.Provider value={dispatch}>
        <CalendarStateContext.Provider value={{ ...state, ...aux }}>
          {children}
        </CalendarStateContext.Provider>
      </CalendarDispatchContext.Provider>
  );
};
