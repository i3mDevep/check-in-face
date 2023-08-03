import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { addDays, addMonths, addWeeks, addYears } from "date-fns";
import dayjs from "dayjs";

import { ButtonsNextDateProps, formatMode } from "./types/ButtonNextDateType";
import { useCalendarDispatch, useCalendarState } from "../../contexts";

export const ButtonsNextDateBase: React.FC<ButtonsNextDateProps> = ({
  mode,
  onChangeDate,
  currentDate
}) => {
  const addDateGeneral =
    (add: (date: number | Date, amount: number) => Date) => (amount: number) =>
      onChangeDate(add(currentDate, amount));

  const handlerActions: Record<
    keyof typeof formatMode,
    (amount: number) => void
  > = {
    month: addDateGeneral(addMonths),
    year: addDateGeneral(addYears),
    week: addDateGeneral(addWeeks),
    day: addDateGeneral(addDays)
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      justifyContent="space-between"
      data-testid="control-next-date-manual"
    >
      <Tooltip arrow placement="top" title={`Previous ${mode}`}>
        <IconButton onClick={() => handlerActions[mode](-1)}>
          <NavigateBeforeIcon />
        </IconButton>
      </Tooltip>
      <Typography variant="h6">
        {dayjs(currentDate).format(formatMode[mode])}
      </Typography>
      <Tooltip arrow placement="top" title={`Next ${mode}`}>
        <IconButton onClick={() => handlerActions[mode](1)}>
          <NavigateNextIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export const ButtonsNextDate: React.FC = () => {
  const { selectedDate, layout } = useCalendarState();
  const { setStateCalendar } = useCalendarDispatch();
  return (
    <ButtonsNextDateBase
      mode={layout}
      currentDate={selectedDate}
      onChangeDate={(e) =>
        setStateCalendar((prev) => ({ ...prev, selectedDate: e }))
      }
    />
  );
};
