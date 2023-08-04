import { useMemo } from "react";

import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";
import dayjs from "dayjs";

export const CalendarHeaderDays: React.FC = () => {
  const theme = useTheme();

  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(new Date()),
        end: endOfWeek(new Date())
      }),
    []
  );
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      justifyItems="center"
      alignItems="center"
      marginLeft={20}
      width='calc(100% - 20px)'
    >
      {days.map((day: Date, index: number) => {
        return (
          <Grid item xs key={`calendar-column-header-label-${index}`}>
            <Box
              sx={{
                borderBottom: `1px solid ${theme.palette.divider}`,
                paddingBottom: 3,
                textAlign: "center",
                borderRadius: 0
              }}
            >
              <Typography
                color="GrayText"
                variant="subtitle2"
                textTransform="uppercase"
              >
                {dayjs(day).format("dddd")}
              </Typography>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};
