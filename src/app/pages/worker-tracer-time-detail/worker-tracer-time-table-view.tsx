import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { TracerTimeWorkerTable } from 'src/app/entities/worker-timeline/components/tracer-time-worker-table';
import { IdentificationProvider } from 'src/app/shared/provider/identification-provider';
import { GetListWorkerMarkTime_getListWorkerMarkTime } from 'src/graphql/queries/__generated__/GetListWorkerMarkTime';

export const WorkerTracerTimeTableView = (props: {
  onResultMarkTime: (
    data: GetListWorkerMarkTime_getListWorkerMarkTime[] | undefined
  ) => void;
}) => {
  const { identification } = useParams();

  if (!identification) return;

  return (
    <IdentificationProvider>
      <Stack gap={10} padding={10} height="100%">
        <TracerTimeWorkerTable
          onResultMarkTime={props.onResultMarkTime}
          identification={identification}
        />
      </Stack>
    </IdentificationProvider>
  );
};
