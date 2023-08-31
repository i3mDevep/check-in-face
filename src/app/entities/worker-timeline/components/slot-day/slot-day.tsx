import dayjs from 'dayjs';
import { Box, Typography } from '@mui/material';
import {
  PropsBase,
  withCalendarSlotBase,
} from 'src/app/shared/components/calendar';
import { IntervalWorkerTime } from 'src/api-graphql-types';

export const SlotDay = withCalendarSlotBase<
  IntervalWorkerTime,
  PropsBase & { hiddenDates?: boolean }
>((props) => {
  return props.resourceList.map((item) => (
    <Box
      key={item.date.toString()}
      bgcolor="rgb(102, 157, 246)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={5}
      color="white"
      lineHeight={0}
      sx={{
        position: 'absolute',
        top: `${item.position?.top}%`,
        height: `${item.position?.height}%`,
        minHeight: 15,
        width: '98%',
        borderRadius: 5,
      }}
    >
      <Box>
        <Typography fontWeight={500} component="span" fontSize="small">
          <strong>
            {dayjs(item.end).diff(item.start, 'hours', true).toFixed(2)}
          </strong>
        </Typography>
      </Box>
    </Box>
  ));
});
