import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { isToday } from "date-fns";
import dayjs from "dayjs";

import { DaysWeekBoardProps } from "./types/DaysWeekBoardTypes";

export const DaysWeekBoard = <S,>({
  days,
  neverHighlight,
  selectedDate,
  slot,
  slotProps,
  optionSlot,
  onClickDay
}: DaysWeekBoardProps<S>) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        height: "calc(100% - 50px)"
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
              overflow: "hidden",
              borderBottom: `1px solid ${theme.palette.divider}`,
              borderRight: `1px solid ${theme.palette.divider}`,
              ...(dayIndex === 0 && {
                borderLeft: `1px solid ${theme.palette.divider}`
              }),
              ...(!neverHighlight &&
                isToday(day) && {
                  border: `1px solid ${theme.palette.secondary.main}`
                }),
              ...(dayjs(selectedDate).isSame(dayjs(day)) && {
                outline: `2px solid ${theme.palette.secondary.main}`,
                zIndex: 2,
                outlineOffset: "-2px"
              })
            }}
          >
            <Box
              sx={{
                backgroundColor: "grey.50",
                textAlign: "center"
              }}
            >
              <Typography fontSize="small" textTransform="capitalize">
                {day.getDate() === 1 ? dayjs(day).format("MMMM ") : null}
                <span>{day.getDate()}</span>
              </Typography>
            </Box>
            <Box overflow="auto" height="95%">
              {slot?.[optionSlot]?.({ day, ...slotProps })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
