import { SlotDay } from 'src/app/entities/worker-timeline/components/slot-day';
import {
  CalendarFully,
  useCalendarState,
} from 'src/app/shared/components/calendar';
import { useGraphqlMarkTimeWorker } from '../../hooks/useGraphqlMarkTimeWorker';
import { useMemo } from 'react';

export const TracerTimeWorkerCalendar = ({
  identification,
}: {
  identification: string;
}) => {
  const { selectedDate } = useCalendarState();
  const { resultMarkTimeWorker } = useGraphqlMarkTimeWorker({
    query: {
      identification,
      year: selectedDate.getFullYear().toString(),
      month: selectedDate.getMonth().toString(),
      day: selectedDate.getDate().toString(),
    },
  });

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
