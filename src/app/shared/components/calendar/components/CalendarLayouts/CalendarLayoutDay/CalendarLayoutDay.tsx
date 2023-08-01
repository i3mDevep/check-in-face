import { Box, Stack, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';
import { CalendarSlots } from '../../../types/calendar';
import { useCalendarState } from '../../../contexts';

function generateHourList(): string[] {
  const hours = Array.from({ length: 24 }, (_, hour) => hour.toString());
  return hours;
}

export const CalendarLayoutDayBase = <S,>({
  day,
  slot,
  slotProps,
}: CalendarSlots<S> & { day: Date }) => {
  const theme = useTheme();

  return (
    <Stack height="100%" marginLeft={5}>
      <Stack color="GrayText" direction="row" marginBottom={10}>
        <Typography marginLeft={1}>{dayjs(day).format('dddd')}</Typography>
        <Typography marginLeft={1.5}>|</Typography>
        <Typography marginLeft={1.5}>
          {dayjs(day).format('MMMM D, YYYY')}
        </Typography>
      </Stack>

      <Stack direction="row">
        <Stack
          display="grid"
          gridTemplateColumns="1fr"
          gridTemplateRows="repeat(24, minmax(50px, 1fr))"
        >
          {generateHourList().map((hour, i) => (
            <Typography
              key={`indicator-${hour}`}
              fontSize="small"
              component="span"
              sx={i === 0 ? { visibility: 'hidden' } : {}}
              lineHeight={0}
            >
              {hour}
            </Typography>
          ))}
        </Stack>

        <Grid
          container
          spacing={0}
          direction="column"
          justifyItems="space-evenly"
          alignItems="stretch"
          height="100%"
          sx={{
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Stack
            display="grid"
            position='relative'
            gridTemplateColumns="1fr"
            gridTemplateRows="repeat(24, minmax(50px, 1fr))"
            width="100%"
          >
            {generateHourList().map((hour) => (
              <Box key={`divisor-${hour}`} borderBottom={`1px solid ${theme.palette.divider}`} />
            ))}
            {slot?.day?.({ ...slotProps, day })}
          </Stack>
        </Grid>
      </Stack>
    </Stack>
  );
};

export const CalendarLayoutDay = <S,>(props: CalendarSlots<S>) => {
  const { selectedDate } = useCalendarState();
  return <CalendarLayoutDayBase day={selectedDate} {...props} />;
};
