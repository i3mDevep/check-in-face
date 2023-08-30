import { SlotDay } from 'src/app/entities/worker-timeline/components/slot-day';
import {
  CalendarFully,
  useCalendarState,
} from 'src/app/shared/components/calendar';
import { useGraphqlMarkTimeWorker } from '../../hooks/useGraphqlMarkTimeWorker';
import { useEffect, useMemo } from 'react';
import { endOfWeek, startOfWeek } from 'date-fns';

export const TracerTimeWorkerCalendar = ({
  identification,
}: {
  identification: string;
}) => {
  const { selectedDate } = useCalendarState();
  const {
    lazyQueryIntervalsTime: [getIntervalsTime, { data: dateIntervalsTime }],
  } = useGraphqlMarkTimeWorker();

  useEffect(() => {
    (async () => {
      await getIntervalsTime({
        variables: {
          query: {
            identification,
            start: startOfWeek(selectedDate).toISOString(),
            end: endOfWeek(selectedDate).toISOString(),
          },
        },
      });
    })();
  }, [getIntervalsTime, identification, selectedDate]);

  const resourceListDto = useMemo(
    () =>
      dateIntervalsTime?.getWorkerIntervalsTime?.flatMap((time) =>
        time?.start ? { ...time, date: new Date(time.start) } : []
      ),
    [dateIntervalsTime]
  );

  return (
    <CalendarFully
      slot={{ day: SlotDay }}
      slotProps={{ resourceList: resourceListDto ?? [] }}
      sx={{ root: { maxHeight: 'calc(100vh - 170px)' } }}
    />
  );
};
