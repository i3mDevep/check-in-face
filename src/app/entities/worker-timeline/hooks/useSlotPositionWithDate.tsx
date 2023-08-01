import { useMemo } from 'react';
import { differenceInMinutes, endOfDay, isToday, startOfDay } from 'date-fns';
import {
  CalendarSlotBaseProps,
  PropsBase,
} from 'src/app/shared/components/calendar';
import { GetListWorkerMarkTime_getListWorkerMarkTime } from 'src/graphql/queries/__generated__/GetListWorkerMarkTime';

const totalMinutesForDay = 60 * 24;

type IntervalsTypes = {
  start: Date;
  end: Date;
  minutes: number;
  position: {
    top: number;
    height: number;
  };
};

const calculatePercentage = (end: Date, start: Date) =>
  (differenceInMinutes(end, start) / totalMinutesForDay) * 100;

const calculateIntervalItem = (
  start: Date,
  end: Date,
  calculateTop: (start: Date) => number
): IntervalsTypes => {
  return {
    start,
    end,
    minutes: differenceInMinutes(end, start),
    position: {
      top: calculateTop(start),
      height: calculatePercentage(end, start),
    },
  };
};

const calculateTop = (start: Date) =>
  calculatePercentage(start, startOfDay(start));

export const useSlotPositionWithDate = (
  resourceList: CalendarSlotBaseProps<
    GetListWorkerMarkTime_getListWorkerMarkTime,
    PropsBase
  >['resourceList']
) => {
  return useMemo(() => {
    const filterResource = resourceList
      .filter((resourceItem) => resourceItem.dateRegister)
      .sort(
        (a, b) =>
          new Date(a.dateRegister as string).getTime() -
          new Date(b.dateRegister as string).getTime()
      );
    const result: IntervalsTypes[] = [];
    const positionsReady: number[] = [];
    filterResource.forEach((resource, index) => {
      const resourceDateRegisterDate = new Date(
        resource.dateRegister as string
      );

      if (positionsReady.some((positionCheck) => positionCheck === index))
        return;
      if (index === 0 && resource.type === 'out') {
        result.push(
          calculateIntervalItem(
            startOfDay(resourceDateRegisterDate),
            resourceDateRegisterDate,
            () => 0
          )
        );
        positionsReady.push(index);
        return;
      }
      if (index === filterResource.length - 1 && resource.type === 'in') {
        result.push(
          calculateIntervalItem(
            resourceDateRegisterDate,
            isToday(resourceDateRegisterDate)
              ? new Date()
              : endOfDay(resourceDateRegisterDate),
            calculateTop
          )
        );
        positionsReady.push(index);
        return;
      }

      positionsReady.push(index);
      positionsReady.push(index + 1);

      result.push(
        calculateIntervalItem(
          resourceDateRegisterDate,
          new Date(filterResource[index + 1].dateRegister as string),
          calculateTop
        )
      );
    });
    return result;
  }, [resourceList]);
};
