import Box from '@mui/material/Box';
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';

import { GetListWorkerMarkTime_getListWorkerMarkTime } from 'src/graphql/queries/__generated__/GetListWorkerMarkTime';
import { useGraphqlMarkTimeWorker } from '../../hooks/useGraphqlMarkTimeWorker';
import { Avatar } from '@mui/material';

const { VITE_CDN_IMAGES_WORKER } = import.meta.env

const columns: GridColDef<GetListWorkerMarkTime_getListWorkerMarkTime>[] = [
  {
    field: 'picture',
    headerName: 'Picture',
    renderCell: (params) => <Avatar alt={params.value} src={`${VITE_CDN_IMAGES_WORKER}/${params.value}`} />,
  },
  { field: 'identification', headerName: 'Identification', width: 120 },
  {
    field: 'dateRegister',
    headerName: 'Date mark',
    width: 200,
    editable: false,
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      return dayjs(params.value).format('MMMM D, YYYY h:mm A');
    },
  },
  { field: 'reason', headerName: 'Reason', width: 100 },
  {
    field: 'created',
    headerName: 'Created',
    width: 200,
    editable: false,
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      return dayjs(params.value).format('MMMM D, YYYY h:mm A');
    },
  },
];

export function TracerTimeWorkerTable({
  identification,
}: {
  identification: string;
}) {
  const { resultMarkTimeWorker } = useGraphqlMarkTimeWorker({
    query: {
      identification,
      year: '2023',
      month: '6',
      //   day: '26',
    },
  });

  return (
    <Box sx={{ height: '100%', maxHeight: '85vh', width: '100%' }}>
      <DataGrid
        getRowId={(row) => row.dateRegister as string}
        rows={resultMarkTimeWorker?.data?.getListWorkerMarkTime ?? []}
        columns={columns}
        hideFooter
        disableRowSelectionOnClick
      />
    </Box>
  );
}
