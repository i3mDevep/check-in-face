import dayjs from 'dayjs';
import { useMemo } from 'react';

import { Box, Typography } from '@mui/material';
import {
  differenceInHours,
  differenceInMinutes,
  endOfDay,
  isToday,
  startOfDay,
} from 'date-fns';

import { withCalendarSlotBase } from 'src/app/shared/components/calendar';
import { GetListWorkerMarkTime_getListWorkerMarkTime } from 'src/graphql/queries/__generated__/GetListWorkerMarkTime';

const totalMinutesForDay = 60 * 24;

type IntervalsTypes = {
  start: Date;
  end: Date;
  position: {
    top: number;
    height: number;
  };
};

export const SlotDay =
  withCalendarSlotBase<GetListWorkerMarkTime_getListWorkerMarkTime>((props) => {
    const intervals = useMemo(() => {
      const filterResource = props.resourceList
        .filter((resourceItem) => resourceItem.dateRegister)
        .sort(
          (a, b) =>
            new Date(a.dateRegister as string).getTime() -
            new Date(b.dateRegister as string).getTime()
        );
      const result: IntervalsTypes[] = [];
      const positionsReady: number[] = [];
      filterResource.forEach((resource, index) => {
        const resourceDateRegisterDate = new Date(
          resource.dateRegister as string
        );
        const calculatePercentage = (end: Date, start: Date) =>
          (differenceInMinutes(end, start) / totalMinutesForDay) * 100;
        const calculateTop = (start: Date) =>
          calculatePercentage(start, startOfDay(start));

        if (positionsReady.some((positionCheck) => positionCheck === index))
          return;
        if (index === 0 && resource.type === 'out') {
          result.push({
            start: startOfDay(resourceDateRegisterDate),
            end: resourceDateRegisterDate,
            position: {
              top: 0,
              height: calculatePercentage(
                resourceDateRegisterDate,
                startOfDay(resourceDateRegisterDate)
              ),
            },
          });
          positionsReady.push(index);
          return;
        }
        if (index === filterResource.length - 1 && resource.type === 'in') {
          result.push({
            start: resourceDateRegisterDate,
            end: isToday(resourceDateRegisterDate)
              ? new Date()
              : endOfDay(resourceDateRegisterDate),
            position: {
              top: calculateTop(resourceDateRegisterDate),
              height: isToday(resourceDateRegisterDate)
                ? calculatePercentage(new Date(), resourceDateRegisterDate)
                : calculatePercentage(
                    endOfDay(resourceDateRegisterDate),
                    resourceDateRegisterDate
                  ),
            },
          });
          positionsReady.push(index);
          return;
        }

        positionsReady.push(index);
        positionsReady.push(index + 1);

        result.push({
          start: resourceDateRegisterDate,
          end: new Date(filterResource[index + 1].dateRegister as string),
          position: {
            top: calculateTop(resourceDateRegisterDate),
            height: calculatePercentage(
              new Date(filterResource[index + 1].dateRegister as string),
              resourceDateRegisterDate
            ),
          },
        });
      });
      return result;
    }, [props.resourceList]);


    return intervals.map((item) => (
      <Box
        bgcolor="rgb(102, 157, 246)"
        padding={5}
        color="white"
        lineHeight={0}
        sx={{
          position: 'absolute',
          top: `${item.position.top}%`,
          height: `${item.position.height}%`,
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
            {`${dayjs(item.start).format('HH:mm')} - ${dayjs(item.end).format(
              'HH:mm'
            )}`}{' '}
            <strong style={{ marginLeft: 5 }}>
              time (hh:mm) -{' '}
              {`${
                toHoursAndMinutes(differenceInMinutes(item.end, item.start))
                  .hours
              }:${
                toHoursAndMinutes(differenceInMinutes(item.end, item.start))
                  .minutes
              }`}
            </strong>
          </Typography>
        </Box>
      </Box>
    ));
  });

function toHoursAndMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
}
