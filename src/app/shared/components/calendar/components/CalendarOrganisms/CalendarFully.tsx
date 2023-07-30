import { Box, Grid, Paper, SxProps } from "@mui/material";

import {
  ButtonsNextDate,
  CalendarIndicator,
  CalendarLayoutManagement,
  CalendarPicker,
  CalendarPickerProps,
  SelectLayoutCalendar
} from "..";
import { CalendarSlots } from "../../types/calendar";

export const CalendarFully = <S,>(
  props: CalendarSlots<S> & {
    calendarPicker?: CalendarPickerProps;
    sx?: { root?: SxProps; control?: SxProps; view?: SxProps };
  }
) => (
  <Paper sx={{ height: "100%", ...props?.sx?.root }} elevation={0}>
    <Grid height="100%" wrap="nowrap" container>
      <Box
        gap={2}
        flexDirection="column"
        display="flex"
        bgcolor="#FAFAFA"
        flex={1}
        borderRadius="5px"
        sx={props?.sx?.control ?? {}}
      >
        <CalendarIndicator />
        <SelectLayoutCalendar />
        <ButtonsNextDate />
        <CalendarPicker {...props?.calendarPicker} />
      </Box>
      <Box
        flex={5}
        sx={{
          overflowY: "auto",
          scrollbarWidth: "thin",
          "::-webkit-scrollbar": {
            width: "3px"
          },
          ...(props?.sx?.view ?? {})
        }}
      >
        <CalendarLayoutManagement {...props} />
      </Box>
    </Grid>
  </Paper>
);
