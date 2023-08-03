import { Stack, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { isToday } from 'date-fns';
import dayjs from 'dayjs';

import { DaysWeekBoardProps } from './types/DaysWeekBoardTypes';
import { generateHourList } from 'src/app/utils/generate-hours';

export const DaysWeekBoard = <S,>({
  days,
  neverHighlight,
  selectedDate,
  slot,
  slotProps,
  optionSlot,
  onClickDay,
}: DaysWeekBoardProps<S>) => {
  const theme = useTheme();

  return (
    <Stack direction="row">
      <Stack
        display="grid"
        gridTemplateColumns="1fr"
        gridTemplateRows="repeat(24, minmax(50px, 1fr))"
        marginTop={15}
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
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          height: 'calc(100% - 50px)',
          overflow: 'auto',
          width: '100%',
        }}
      >
        {days.map((day: Date, dayIndex: number) => {
          return (
            <Box
              onClick={() => onClickDay?.(day)}
              data-testid={`layout-week-day-${day.getDate()}`}
              key={`calendar-week-line-${day.getDate()}-column`}
              height="100%"
              position="relative"
              sx={{
                borderBottom: `1px solid ${theme.palette.divider}`,
                borderRight: `1px solid ${theme.palette.divider}`,
                ...(dayIndex === 0 && {
                  borderLeft: `1px solid ${theme.palette.divider}`,
                }),
                ...(!neverHighlight &&
                  isToday(day) && {
                    border: `1px solid ${theme.palette.secondary.main}`,
                  }),
                ...(dayjs(selectedDate).isSame(dayjs(day)) && {
                  outline: `2px solid ${theme.palette.secondary.main}`,
                  zIndex: 2,
                  outlineOffset: '-2px',
                }),
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'grey.50',
                  textAlign: 'center',
                }}
              >
                <Typography fontSize="small" textTransform="capitalize">
                  {day.getDate() === 1 ? dayjs(day).format('MMMM ') : null}
                  <span>{day.getDate()}</span>
                </Typography>
              </Box>
              <Stack
                display="grid"
                position="relative"
                gridTemplateColumns="1fr"
                gridTemplateRows="repeat(24, minmax(50px, 1fr))"
                width="100%"
              >
                {generateHourList().map((hour) => (
                  <Box
                    key={`divisor-${hour}`}
                    borderBottom={`1px solid ${theme.palette.divider}`}
                  />
                ))}
                {slot?.day?.({ ...slotProps, day, hiddenDates: true })}
              </Stack>
            </Box>
          );
        })}
      </Box>
    </Stack>
  );
};
