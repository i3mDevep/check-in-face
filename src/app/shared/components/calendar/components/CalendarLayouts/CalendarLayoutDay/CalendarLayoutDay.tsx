import { Stack, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import { CalendarSlots } from "../../../types/calendar";
import { useCalendarState } from "../../../contexts";


export const CalendarLayoutDayBase = <S,>({
  day,
  slot,
  slotProps
}: CalendarSlots<S> & { day: Date }) => {
  const theme = useTheme();

  return (
    <Stack height="100%">
      <Stack color="GrayText" direction="row">
        <Typography marginLeft={1}>{dayjs(day).format("dddd")}</Typography>
        <Typography marginLeft={1.5}>|</Typography>
        <Typography marginLeft={1.5}>
          {dayjs(day).format("MMMM D, YYYY")}
        </Typography>
      </Stack>

      <Grid
        container
        spacing={0}
        direction="row"
        justifyItems="space-evenly"
        alignItems="stretch"
        height="100%"
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          overflowY: "auto"
        }}
      >
        {slot?.day?.({ ...slotProps, day })}
      </Grid>
    </Stack>
  );
};

export const CalendarLayoutDay = <S,>(props: CalendarSlots<S>) => {
  const { selectedDate } = useCalendarState();
  return <CalendarLayoutDayBase day={selectedDate} {...props} />;
};
