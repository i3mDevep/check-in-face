import { SlotDay } from 'src/app/entities/worker-timeline/components/slot-day';
import {
  CalendarFully,
  layoutOptions,
  useCalendarState,
} from 'src/app/shared/components/calendar';
import { useGraphqlMarkTimeWorker } from '../../hooks/useGraphqlMarkTimeWorker';
import { useEffect, useMemo } from 'react';
import { getMonth, getWeek } from 'date-fns';

export const TracerTimeWorkerCalendar = ({
  identification,
}: {
  identification: string;
}) => {
  const { selectedDate, layout, daysInWeek } = useCalendarState();
  const { resultMarkTimeWorker } = useGraphqlMarkTimeWorker({
    query: {
      identification,
      year: selectedDate.getFullYear().toString(),
      month: selectedDate.getMonth().toString(),
      day:
        layout === layoutOptions.DAY
          ? selectedDate.getDate().toString()
          : undefined,
    },
  });

  useEffect(() => {
    if (layout === layoutOptions.DAY) {
      return;
    }

    const [month] = Array.from(
      new Set(
        daysInWeek
          .map((day) => day.getMonth())
          .filter((day) => day !== selectedDate.getMonth())
      )
    );
    const [year] = Array.from(
      new Set(
        daysInWeek
          .map((day) => day.getFullYear())
          .filter((day) => day !== selectedDate.getFullYear())
      )
    );

    if (!month) return;

    resultMarkTimeWorker.client.cache.restore({});
    resultMarkTimeWorker.fetchMore({
      variables: {
        query: {
          day: undefined,
          month: month.toString(),
          limit: 5,
          identification,
          reverse: month < selectedDate.getMonth(),
          year: year ?? selectedDate.getFullYear().toString(),
        },
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }

        const previousEdges = previousResult.getListWorkerMarkTime;
        const fetchMoreEdges = fetchMoreResult.getListWorkerMarkTime;

        fetchMoreResult.getListWorkerMarkTime = [
          ...previousEdges,
          ...fetchMoreEdges,
        ];
        return { ...fetchMoreResult };
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout]);

  const resourceListDto = useMemo(
    () =>
      resultMarkTimeWorker.data?.getListWorkerMarkTime.flatMap((time) =>
        time.dateRegister ? { ...time, date: new Date(time.dateRegister) } : []
      ),
    [resultMarkTimeWorker]
  );

  return (
    <CalendarFully
      slot={{ day: SlotDay }}
      slotProps={{ resourceList: resourceListDto ?? [] }}
      sx={{ root: { maxHeight: 'calc(100vh - 170px)' } }}
    />
  );
};
