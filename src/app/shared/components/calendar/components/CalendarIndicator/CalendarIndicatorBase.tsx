import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { isToday } from "date-fns";
import dayjs from "dayjs";

import { CalendarIndicatorBaseProps } from "./types/CalendarIndicatorTypes";

export const CalendarIndicatorBase: React.FC<CalendarIndicatorBaseProps> = ({
  date,
  showButtonToday,
  onClickToday
}) => {
  const theme = useTheme();

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack
        direction="row"
        justifyContent="space-between"
        width="fit-content"
        textAlign="left"
        gap={1}
        m={1}
      >
        <Stack
          borderRadius="50%"
          width="36px"
          height="36px"
          alignItems="center"
          justifyContent="center"
          border={`1px solid ${theme.palette.secondary.light}`}
          bgcolor={isToday(date) ? theme.palette.secondary.light : "inherit"}
          color={theme.palette.common.black}
        >
          {dayjs(date).format("D")}
        </Stack>
        <Box>
          <Typography mx="6px" mt="3px" variant="h6">
            {dayjs(date).format(" dddd")}
          </Typography>
          <Typography ml="6px">
            {dayjs(date).format(" MMMM DD, YYYY")}
          </Typography>
        </Box>
      </Stack>
      {showButtonToday && (
        <Button
          sx={{ height: "fit-content", margin: "10px", padding: 0 }}
          color="secondary"
          size="small"
          variant="outlined"
          onClick={onClickToday}
        >
          Today
        </Button>
      )}
    </Stack>
  );
};
