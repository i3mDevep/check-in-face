import { useCallback, useMemo } from "react";


import {
  CalendarLayoutDay,
  CalendarLayoutMonth,
  CalendarLayoutWeek,
  CalendarLayoutYear
} from "..";
import { layoutOptions, useCalendarState } from "../../contexts";
import { CalendarSlots } from "../../types/calendar";

export const CalendarLayoutManagement = <S,>(props: CalendarSlots<S>) => {
  const { layout } = useCalendarState();
  const Error = useMemo(() => <>Error: layout not implemented</>, []);

  const getComponents = useCallback(
    (): Record<layoutOptions, JSX.Element> => ({
      [layoutOptions.MONTH]: <CalendarLayoutMonth {...props} />,
      [layoutOptions.YEAR]: <CalendarLayoutYear {...props} />,
      [layoutOptions.WEEK]: <CalendarLayoutWeek {...props} />,
      [layoutOptions.DAY]: <CalendarLayoutDay {...props} />
    }),
    [props]
  );

  const component = useMemo(
    () => (layout in getComponents() ? getComponents()[layout] : Error),
    [Error, layout, getComponents]
  );

  return component;
};
