/* eslint-disable react-hooks/exhaustive-deps */
import { SlotDay } from 'src/app/entities/worker-timeline/components/slot-day';
import {
  CalendarFully,
  layoutOptions,
  useCalendarState,
} from 'src/app/shared/components/calendar';
import { useGraphqlMarkTimeWorker } from '../../hooks/useGraphqlMarkTimeWorker';
import { useCallback, useEffect, useMemo } from 'react';
import { GetListWorkerMarkTime_getListWorkerMarkTime } from 'src/graphql/queries/__generated__/GetListWorkerMarkTime';
import { getWeek } from 'date-fns';

export const TracerTimeWorkerCalendar = ({
  identification,
}: {
  identification: string;
}) => {
  const { selectedDate, layout, daysInWeek } = useCalendarState();
  const {
    lazyQuery: [getMarkTimeWorker, { data, fetchMore }],
  } = useGraphqlMarkTimeWorker();

  const numberWeek = useMemo(() => getWeek(selectedDate), [selectedDate]);

  const infoDate = useMemo(() => {
    const year = selectedDate.getFullYear().toString();
    const month = selectedDate.getMonth().toString();
    const day = selectedDate.getDate().toString();
    return { year, month, day };
  }, [selectedDate]);

  const fetchMoreMarkTimeWorker = useCallback(async () => {
    const uniqueMonths = Array.from(
      new Set(daysInWeek.map((day) => day.getMonth()))
    ).filter((month) => month !== selectedDate.getMonth());

    const uniqueYears = Array.from(
      new Set(daysInWeek.map((day) => day.getFullYear()))
    ).filter((year) => year !== selectedDate.getFullYear());

    const [month] = uniqueMonths;
    const [year] = uniqueYears;

    if (!month) return;

    return fetchMore({
      variables: {
        query: {
          day: undefined,
          month: month.toString(),
          limit: 20,
          identification,
          reverse: Number(month) < Number(infoDate.month),
          year: year ?? infoDate.year,
        },
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const map = new Map<
          string,
          GetListWorkerMarkTime_getListWorkerMarkTime
        >();
        if (!fetchMoreResult) {
          return previousResult;
        }

        const previousEdges = previousResult.getListWorkerMarkTime ?? [];
        const fetchMoreEdges = fetchMoreResult.getListWorkerMarkTime ?? [];

        fetchMoreResult.getListWorkerMarkTime = [
          ...previousEdges,
          ...fetchMoreEdges,
        ];

        fetchMoreResult.getListWorkerMarkTime.map((result) =>
          map.set(result.picture as string, { ...result })
        );

        return { getListWorkerMarkTime: Array.from(map.values()) ?? [] };
      },
    });
  }, [fetchMore, identification, numberWeek]);

  useEffect(() => {
    (async () => {
      await getMarkTimeWorker({
        variables: {
          query: {
            identification,
            month: infoDate.month,
            year: infoDate.year,
            ...(layout === layoutOptions.DAY && { day: infoDate.day }),
          },
        },
      });
      if (layout === layoutOptions.DAY) return;
      await fetchMoreMarkTimeWorker();
    })();
  }, [
    getMarkTimeWorker,
    identification,
    numberWeek,
    layout,
    fetchMoreMarkTimeWorker,
  ]);

  const resourceListDto = useMemo(
    () =>
      data?.getListWorkerMarkTime.flatMap((time) =>
        time.dateRegister ? { ...time, date: new Date(time.dateRegister) } : []
      ),
    [data]
  );

  return (
    <CalendarFully
      slot={{ day: SlotDay }}
      slotProps={{ resourceList: resourceListDto ?? [] }}
      sx={{ root: { maxHeight: 'calc(100vh - 170px)' } }}
    />
  );
};
