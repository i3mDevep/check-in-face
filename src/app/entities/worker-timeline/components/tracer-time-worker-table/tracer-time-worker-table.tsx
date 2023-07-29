import Box from '@mui/material/Box';
import {
  DataGrid,
  GridColDef,
  GridFilterItem,
  GridFilterModel,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';

import { GetListWorkerMarkTime_getListWorkerMarkTime } from 'src/graphql/queries/__generated__/GetListWorkerMarkTime';
import { useGraphqlMarkTimeWorker } from '../../hooks/useGraphqlMarkTimeWorker';
import { Avatar, Chip } from '@mui/material';
import { useMemo, useState } from 'react';
import { FilterDateMarkTracerWorker } from './filter-data-tracer-time';

interface CustomToolbarProps {
  setFilterButtonEl: React.Dispatch<
    React.SetStateAction<HTMLButtonElement | null>
  >;
}

function CustomToolbar({ setFilterButtonEl }: CustomToolbarProps) {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton ref={setFilterButtonEl} />
    </GridToolbarContainer>
  );
}

const { VITE_CDN_IMAGES_WORKER } = import.meta.env;

const columns: GridColDef<GetListWorkerMarkTime_getListWorkerMarkTime>[] = [
  {
    field: 'picture',
    headerName: 'Picture',
    filterable: false,
    renderCell: (params) => (
      <Avatar
        alt={params.value}
        src={`${VITE_CDN_IMAGES_WORKER}/${params.value}`}
      />
    ),
  },
  {
    field: 'identification',
    headerName: 'Identification',
    width: 120,
    filterable: false,
  },
  {
    field: 'dateRegister',
    headerName: 'Date mark',
    width: 200,
    editable: false,
    filterOperators: [
      {
        label: 'day',
        value: 'day',
        getApplyFilterFn: (filterItem: GridFilterItem) => {
          if (!filterItem.field || !filterItem.value || !filterItem.operator) {
            return null;
          }
          return (): boolean => true;
        },
        InputComponent: FilterDateMarkTracerWorker,
        requiresFilterValue: false,
      },
      {
        label: 'year month',
        value: 'year_month',
        getApplyFilterFn: (filterItem: GridFilterItem) => {
          if (!filterItem.field || !filterItem.value || !filterItem.operator) {
            return null;
          }
          return (): boolean => true;
        },
        InputComponent: FilterDateMarkTracerWorker,
        requiresFilterValue: false,
      },
    ],
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      return dayjs(params.value).format('MMMM D, YYYY h:mm A');
    },
  },
  {
    field: 'reason',
    filterable: false,
    headerName: 'Reason',
    width: 150,
    renderCell: (params) => (
      <Chip label={params.row.reason} variant="outlined" />
    ),
  },
  {
    field: 'created',
    filterable: false,
    headerName: 'Created',
    width: 200,
    editable: false,
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      return dayjs(params.value).format('MMMM D, YYYY h:mm A');
    },
  },
];

const defaultFilterCalendar = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
};

const defaultStringFilter = {
  year: String(defaultFilterCalendar.year),
  month: String(defaultFilterCalendar.month),
  day: String(defaultFilterCalendar.day),
};

export function TracerTimeWorkerTable({
  identification,
}: {
  identification: string;
}) {
  const [filterApplied, setFilterApplied] = useState<GridFilterModel | null>(
    null
  );
  const [filterButtonEl, setFilterButtonEl] =
    useState<HTMLButtonElement | null>(null);

  const filterQueryDto = useMemo(() => {
    if (!filterApplied) return defaultStringFilter;

    const filterDay = filterApplied.items.find(
      (filter) => filter.operator === 'day'
    );
    const filterYearMonth = filterApplied.items.find(
      (filter) => filter.operator === 'year_month'
    );

    if (!filterYearMonth?.value && !filterDay?.value)
      return defaultFilterCalendar;

    return filterDay
      ? { ...filterDay.value }
      : {
          year: filterYearMonth?.value?.year,
          month: filterYearMonth?.value?.month,
        };
  }, [filterApplied]);

  const { resultMarkTimeWorker } = useGraphqlMarkTimeWorker({
    query: {
      identification,
      ...filterQueryDto,
    },
  });

  return (
    <Box sx={{ height: '100%', maxHeight: '85vh', width: '100%' }}>
      <DataGrid
        sx={{ '&.MuiDataGrid-root': { borderRadius: 10 } }}
        slots={{ toolbar: CustomToolbar }}
        initialState={{
          filter: {
            filterModel: {
              items: [
                {
                  id: 'day_id',
                  field: 'dateRegister',
                  operator: 'day',
                  value: defaultFilterCalendar,
                },
                {
                  id: 'year_month_id',
                  field: 'dateRegister',
                  operator: 'year_month',
                  value: defaultFilterCalendar,
                },
              ],
            },
          },
        }}
        slotProps={{
          panel: {
            anchorEl: filterButtonEl,
          },
          toolbar: {
            setFilterButtonEl,
          },
        }}
        onFilterModelChange={setFilterApplied}
        getRowId={(row) => row.dateRegister as string}
        rows={resultMarkTimeWorker?.data?.getListWorkerMarkTime ?? []}
        columns={columns}
        hideFooter
        disableRowSelectionOnClick
      />
    </Box>
  );
}
