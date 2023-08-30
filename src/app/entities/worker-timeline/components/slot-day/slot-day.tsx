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
>(
  (props) => {
    return props.resourceList.map((item) => (
      <Box
        key={item.date.toString()}
        bgcolor="rgb(102, 157, 246)"
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
          <Typography
            lineHeight={0}
            fontWeight={500}
            component="span"
            fontSize="small"
          >
            {!props?.hiddenDates &&
              `${dayjs(item.start).format('HH:mm')} - ${dayjs(item.end).format(
                'HH:mm'
              )}`}{' '}
            <strong>
              {`${item?.minutesFormatter?.hours}:${item?.minutesFormatter?.minutes} `}
              (minutes)
            </strong>
          </Typography>
        </Box>
      </Box>
    ));
  })
;
