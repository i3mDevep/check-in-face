import Box from '@mui/material/Box';
import { GridFilterInputValueProps, GridFilterItem } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

export function FilterDateMarkTracerWorker(props: GridFilterInputValueProps) {
  const { item, applyValue } = props;
  const filterItem: Omit<GridFilterItem, 'value'> & {
    value?: { year: string; month: string; day?: string };
  } = item;

  const operatorIsDay = filterItem.operator === 'day';

  const handleFilterAccept = (newValue: Dayjs | null) => {
    if (!newValue) return;

    const date = newValue.toDate();
    applyValue({
      ...filterItem,
      value: {
        year: date.getFullYear(),
        month: date.getMonth(),
        ...(operatorIsDay ? { day: date.getDate() } : {}),
      },
    });
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 2,
        height: 48,
        pl: '20px',
      }}
    >
      <DatePicker
        value={
          filterItem.value
            ? dayjs(
                new Date(
                  Number(filterItem.value.year),
                  Number(filterItem.value.month),
                  Number(filterItem.value?.day ?? new Date().getDate())
                )
              )
            : dayjs(new Date())
        }
        onAccept={handleFilterAccept}
        slotProps={{ textField: { variant: 'filled', size: 'small' } }}
        label={'Date filter'}
        views={operatorIsDay ? ['year', 'month', 'day'] : ['year', 'month']}
      />
    </Box>
  );
}
