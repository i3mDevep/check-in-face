import Box from '@mui/material/Box';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import dayjs from 'dayjs';

import { useGraphqlWorker } from '../../hooks/useGraphqlWorker';
import { GetListWorker_getListWorker } from 'src/graphql/queries/__generated__/GetListWorker';
import { useIdentificationDispatch } from 'src/app/shared/provider/identification-provider';
import { SelectedActionType } from 'src/app/shared/provider/identification-provider/state';
import { AvatarProfileWorker } from '../avatar-profile-worker';
import { DialogBase } from 'src/app/shared/components/dialog-base';
import { useState } from 'react';
import { FormCreateWorker } from '../create-worker/form-create-worker';
import { GetListWorker_getDetailWorker } from 'src/graphql/queries/__generated__/GetDetailWorker';
import { Chip, CircularProgress, Stack } from '@mui/material';

const { VITE_CDN_IMAGES_WORKER } = import.meta.env;

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

const UpdateWorker = (params: GridRowParams<GetListWorker_getListWorker>) => {
  const {
    detailWorker: [getDetailWorker, result],
  } = useGraphqlWorker(true);

  const [open, setOpen] = useState(false);

  const handleClickOpen = async () => {
    await getDetailWorker({
      variables: { identification: params.row.identification },
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <GridActionsCellItem
        icon={result.loading ? <CircularProgress size={20} /> : <EditIcon />}
        label="Update"
        onClick={handleClickOpen}
      />
      <DialogBase
        title="Update worker"
        description="to update a worker, please enter your full name here
      the identification must be unique."
        dialogProps={{ open, onClose: handleClose }}
      >
        <FormCreateWorker
          modeUpdate
          initialValues={{
            ...(result.data?.getDetailWorker as GetListWorker_getDetailWorker),
            scheduleWeek: result.data?.getDetailWorker.scheduleWeek ?? [],
          }}
          onSubmitEventSuccess={() => setOpen(false)}
        />
      </DialogBase>
    </>
  );
};

const columns: GridColDef<GetListWorker_getListWorker>[] = [
  {
    field: 'profilePath',
    headerName: 'Profile',
    renderCell: (params) => (
      <AvatarProfileWorker
        identification={params.id.toString()}
        src={
          params.row.profilePath
            ? `${VITE_CDN_IMAGES_WORKER}/${params.row.profilePath}`
            : 'https://cdn-icons-png.flaticon.com/512/5556/5556512.png'
        }
      />
    ),
  },
  { field: 'identification', headerName: 'Identification', width: 120 },
  {
    field: 'fullName',
    headerName: 'Full name',
    width: 200,
    editable: true,
  },
  {
    field: 'scheduleWeek',
    headerName: 'Hours by week',
    editable: false,
    width: 120,
    cellClassName: 'cell-chip-schedule',
    renderCell: (params) => {
      return (
        <Chip
          size="small"
          sx={{ margin: 'auto' }}
          label={params.row.scheduleWeek?.reduce((sum, schedule) => {
            const [_, hoursText] = schedule.split(' ');
            return sum + Number(hoursText);
          }, 0) ?? 0}
        />
      );
    },
  },
  {
    field: 'created',
    headerName: 'Created',
    align: 'center',
    headerAlign: 'center',
    width: 200,
    editable: false,
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      return dayjs(params.value).format('MMMM D, YYYY h:mm A');
    },
  },
  {
    field: 'update',
    type: 'actions',
    align: 'center',
    flex: 1,
    headerName: 'Actions',
    getActions: (params) => {
      return [<AttachmentImages {...params} />, <UpdateWorker {...params} />];
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
        sx={{ '&.MuiDataGrid-root': { borderRadius: 10 } }}
        getRowId={(row) => row.identification}
        rows={data?.getListWorker ?? []}
        columns={columns}
        hideFooter
        disableRowSelectionOnClick
      />
    </Box>
  );
}
