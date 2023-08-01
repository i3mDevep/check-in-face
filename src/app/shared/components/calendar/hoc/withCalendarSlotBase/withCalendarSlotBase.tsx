import { ComponentType, useMemo } from "react";

import { startOfDay } from "date-fns";
import dayjs, { Dayjs } from "dayjs";

import {
  CalendarSlotBaseProps,
  PropsBase
} from "./types/withCalendarSlotBaseTypes";
import { useCalendarState } from "../../contexts";

export const withCalendarSlotBase =
  <T, P extends PropsBase = PropsBase>(
    Component: ComponentType<CalendarSlotBaseProps<T, P>>
  ) =>
  (props: CalendarSlotBaseProps<T, P>) => {
    const { day, resourceList } = props;
    const { selectedDate } = useCalendarState();

    const convertDayjs = (date: Date | Dayjs) =>
      date instanceof Date ? dayjs(startOfDay(date)) : date;

    const normalizeDay = day instanceof Date ? startOfDay(day) : day;

    const resourcesPerDay = useMemo(
      () =>
        resourceList.filter((sd) => convertDayjs(sd.date).isSame(normalizeDay)),
      [normalizeDay, resourceList]
    );

    return (
      <Component
        {...props}
        isSlotSelected={dayjs(selectedDate).isSame(normalizeDay)}
        resourceList={resourcesPerDay}
      />
    );
  };
