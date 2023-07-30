import { Box, Stack } from "@mui/material";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { endOfMonth, startOfMonth } from "date-fns";
import dayjs, { Dayjs } from "dayjs";

import { CalendarLayoutYearBaseProps } from "./types/CalendarLayoutYearTypes";
import { useCalendarState } from "../../../contexts";

const ClearComponent = () => <></>;

export const CalendarLayoutYearBase = <S,>({
  monthly,
  calendarProps,
  slot,
  slotProps
}: CalendarLayoutYearBaseProps<Dayjs, S>) => (
  <Stack
    data-testid="calendar-layout-year"
    display="grid"
    gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
    gap="5px"
  >
    {monthly.map((month: Date[]) => (
      <Box
        key={`calendar-year-line-${month?.[0].toDateString()}`}
        height="100%"
      >
        <DateCalendar
          disableHighlightToday={false}
          readOnly
          minDate={dayjs(startOfMonth(month?.[0]))}
          maxDate={dayjs(endOfMonth(month?.[month.length - 1]))}
          sx={{
            "& .MuiPickersCalendarHeader-root > .MuiPickersCalendarHeader-labelContainer":
              {
                fontWeight: "inherit"
              }
          }}
          slots={{
            day: (slot?.year ?? PickersDay) as (
              props: PickersDayProps<Dayjs>
            ) => JSX.Element,
            leftArrowIcon: ClearComponent,
            switchViewButton: ClearComponent,
            rightArrowIcon: ClearComponent
          }}
          slotProps={{
            day: {
              ...slotProps
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any
          }}
          {...calendarProps}
        />
      </Box>
    ))}
  </Stack>
);

export const CalendarLayoutYear = <S,>(
  props: Omit<CalendarLayoutYearBaseProps<Dayjs, S>, "monthly">
) => {
  const { monthly } = useCalendarState();
  return <CalendarLayoutYearBase monthly={monthly} {...props} />;
};
