import Box from '@mui/material/Box';
import { Avatar } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import dayjs from 'dayjs';

import { useGraphqlWorker } from '../../hooks/useGraphqlWorker';
import { GetListWorker_getListWorker } from 'src/graphql/queries/__generated__/GetListWorker';
import { useIdentificationDispatch } from 'src/app/shared/provider/identification-provider';
import { SelectedActionType } from 'src/app/shared/provider/identification-provider/state';

const AttachmentImages = (
  params: GridRowParams<GetListWorker_getListWorker>
) => {
  const dispatch = useIdentificationDispatch();
  return (
    <GridActionsCellItem
      icon={<PermMediaIcon />}
      label="Attachment images"
      onClick={() =>
        dispatch({ type: SelectedActionType.SELECT, payload: params.row })
      }
    />
  );
};

const columns: GridColDef<GetListWorker_getListWorker>[] = [
  {
    field: 'profilePath',
    headerName: 'Profile',
    renderCell: (params) => <Avatar alt={params.value} src={params.value ?? 'https://cdn-icons-png.flaticon.com/512/5556/5556512.png'} />,
  },
  { field: 'identification', headerName: 'Identification', width: 120 },
  {
    field: 'fullName',
    headerName: 'Full name',
    width: 200,
    editable: true,
  },
  {
    field: 'created',
    headerName: 'Created',
    width: 200,
    editable: false,
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      return dayjs(params.value).format('MMMM D, YYYY h:mm A');
    },
  },
  {
    field: 'actions',
    type: 'actions',
    width: 200,
    headerName: 'Attachment images',
    getActions: (params) => {
      return [<AttachmentImages {...params} />];
    },
  },
];

export function WorkerTable() {
  const {
    resultGetWorker: { data },
  } = useGraphqlWorker();

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        sx={{ '&.MuiDataGrid-root': { borderRadius: 10 }}}
        getRowId={(row) => row.identification}
        rows={data?.getListWorker ?? []}
        columns={columns}
        hideFooter
        disableRowSelectionOnClick
      />
    </Box>
  );
}
