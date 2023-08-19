/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {
  Checkbox,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { eachDayOfInterval, getDay } from 'date-fns';
import { LoadingButton } from '@mui/lab';

dayjs.extend(isBetweenPlugin);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  margin: 0,
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
})) as React.ComponentType<CustomPickerDayProps>;

function Day(
  props: PickersDayProps<Dayjs> & {
    selectedRange: [Dayjs | null, Dayjs | null];
  }
) {
  const { day, selectedRange, ...other } = props;

  if (selectedRange?.[0] == null || selectedRange?.[1] === null) {
    return <PickersDay sx={{ margin: 0 }} day={day} {...other} />;
  }

  const [start, end] = selectedRange;

  const dayIsBetween = day.isBetween(start, end, null, '[]');
  const isFirstDay = day.isSame(start, 'day');
  const isLastDay = day.isSame(end, 'day');

  return (
    <CustomPickersDay
      {...other}
      day={day}
      dayIsBetween={dayIsBetween}
      isFirstDay={isFirstDay}
      isLastDay={isLastDay}
    />
  );
}

export function SelectIntervalAndHoliday({
  onGenerate,
  loading,
}: {
  loading: boolean;
  onGenerate: ({
    start,
    end,
    holidays,
  }: {
    start: string;
    end: string;
    holidays: number[];
  }) => void;
}) {
  const [step, setStep] = useState<'select_date' | 'holidays'>('select_date');
  const [checkList, setCheckList] = useState<{ [day: string]: boolean }>({});
  const [selectedRange, setSelectedRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);

  const isSelectDateView = useMemo(() => step === 'select_date', [step]);
  const isHolidayView = useMemo(() => step === 'holidays', [step]);

  const handleOnChange = (day: Dayjs | null) => {
    if (!selectedRange[0] || selectedRange[1]) {
      setSelectedRange([day, null]);
      return;
    }
    if (selectedRange[0].isAfter(day)) return setSelectedRange([null, null]);

    setSelectedRange([selectedRange[0], day]);
    setStep('holidays');
  };
  const viewCalendar = (
    <>
      <Typography>Select date range to generate the payment:</Typography>
      <DateCalendar
        onChange={handleOnChange}
        slots={{ day: Day } as any}
        slotProps={{
          day: {
            selectedRange,
          } as any,
        }}
      />
    </>
  );

  const intervalDays = useMemo(() => {
    if (!selectedRange[0] || !selectedRange[1]) return;
    return eachDayOfInterval({
      start: selectedRange[0].toDate(),
      end: selectedRange[1].toDate(),
    });
  }, [selectedRange]);

  useEffect(() => {
    if (step === 'select_date') return;
    const sundays = intervalDays?.reduce((prev, curr) => {
      return { ...prev, [curr.getDate()]: getDay(curr) === 0 };
    }, {} as { [day: number]: boolean });

    setCheckList((prev) => ({ ...prev, ...sundays }));
  }, [step, intervalDays]);

  const handleGenerate = () => {
    if (!selectedRange[0] || !selectedRange[1]) return;
    onGenerate({
      start: selectedRange[0]?.toISOString(),
      end: selectedRange[1]?.toISOString(),
      holidays: Object.entries(checkList).flatMap(([day, check]) =>
        check ? Number(day) : []
      ),
    });
  };

  const viewHoliday = (
    <FormControl
      sx={{ m: 3, minWidth: 300 }}
      component="fieldset"
      variant="standard"
    >
      <FormLabel component="div">
        <IconButton onClick={() => setStep('select_date')}>
          <ArrowBackIcon />
        </IconButton>
        Must select what days are holiday
      </FormLabel>
      <Divider />
      <FormGroup sx={{ overflow: 'auto', padding: 10 }}>
        {intervalDays?.map((day) => {
          const dayKey = day.getDate().toString();
          return (
            <FormControlLabel
              key={day.getDate().toString()}
              name={day.getDate().toString()}
              checked={!!checkList?.[dayKey]}
              onChange={(_, check) =>
                setCheckList((prev) => ({
                  ...prev,
                  [day.getDate().toString()]: check,
                }))
              }
              control={<Checkbox size="small" />}
              label={dayjs(day).format('dddd, MMMM D, YYYY')}
            />
          );
        })}
      </FormGroup>
      <LoadingButton loading={loading} onClick={handleGenerate}>
        Generate
      </LoadingButton>
    </FormControl>
  );
  return (
    <Stack direction="row">
      <Collapse timeout={1000} orientation="horizontal" in={isSelectDateView}>
        {viewCalendar}
      </Collapse>
      <Collapse timeout={1000} orientation="horizontal" in={isHolidayView}>
        {viewHoliday}
      </Collapse>
    </Stack>
  );
}
