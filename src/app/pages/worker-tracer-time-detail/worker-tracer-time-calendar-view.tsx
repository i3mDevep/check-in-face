import { useParams } from 'react-router-dom';
import { TracerTimeWorkerCalendar } from 'src/app/entities/worker-timeline/components/tracer-time-worker-calendar';
import {
  CalendarProvider,
  layoutOptions,
} from 'src/app/shared/components/calendar';

export const WorkerTracerTimeCalendarView = () => {
  const { identification } = useParams();

  if (!identification) return;

  return (
    <CalendarProvider
      allowViewPicker
      layoutOptionsAllow={[layoutOptions.DAY, layoutOptions.WEEK]}
      defaultLayout={layoutOptions.DAY}
    >
      <TracerTimeWorkerCalendar identification={identification} />
    </CalendarProvider>
  );
};
