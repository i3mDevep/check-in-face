import { useCallback } from "react";

import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { isToday } from "date-fns";
import dayjs from "dayjs";

import { DaysMonthLayoutProps } from "./types/CalendarLayoutMonthTypes";

export const DaysMonthLayout = <S,>({
  weeks,
  slot,
  slotProps,
  selectedDate,
  onClickDay
}: DaysMonthLayoutProps<S>) => {
  const theme = useTheme();

  const maxHeight = useCallback((weeks: Date[][]) => {
    const size = weeks.length;

    if (size === 5) {
      return {
        height: "calc((100% / 5) - 16px)"
      };
    }

    return {
      height: "calc((100% / 6) - 11px)"
    };
  }, []);

  return weeks.map((week: Date[], weekIndex: number) => (
    <Grid
      container
      spacing={0}
      direction="row"
      justifyItems="space-evenly"
      data-testid="layout-month-row"
      alignItems="stretch"
      wrap="nowrap"
      key={`calendar-main-line-${weekIndex}`}
      style={maxHeight(weeks)}
    >
      {week.map((day: Date, dayIndex: number) => {
        return (
          <Grid
            item
            xs
            width={0}
            key={`calendar-main-line-${day}-column`}
            data-testid={`layout-month-day-item-${day.getDate()}`}
            height="100%"
            position="relative"
            sx={{
              cursor: "pointer",
              borderBottom: `1px solid ${theme.palette.divider}`,
              borderRight: `1px solid ${theme.palette.divider}`,
              ...(dayIndex === 0 && {
                borderLeft: `1px solid ${theme.palette.divider}`
              }),
              ...(isToday(day) && {
                border: `1px solid ${theme.palette.secondary.main}`
              }),
              ...(selectedDate &&
                dayjs(selectedDate).isSame(dayjs(day)) && {
                  outline: `2px solid ${theme.palette.secondary.main}`,
                  outlineOffset: "-2px",
                  zIndex: 2
                })
            }}
            onClick={() => onClickDay?.(day)}
          >
            <Box
              sx={{
                textAlign: "center",
                borderRadius: 0,
                minWidth: 64.38,
                height: "100%"
              }}
            >
              <Box
                sx={{
                  backgroundColor: "grey.50"
                }}
              >
                <Typography
                  lineHeight="initial"
                  fontSize="small"
                  textTransform="capitalize"
                >
                  {day.getDate() === 1 ? dayjs(day).format("MMMM ") : null}
                  <span>{day.getDate()}</span>
                </Typography>
              </Box>
              {slot?.month?.({
                day,
                ...slotProps
              } as S)}
            </Box>
          </Grid>
        );
      })}
    </Grid>
  ));
};
