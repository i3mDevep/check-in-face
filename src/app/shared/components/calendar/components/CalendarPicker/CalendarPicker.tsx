import { useCallback } from "react";

import { IconButton, SxProps, Tooltip, useTheme } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { isToday, startOfDay } from "date-fns";
import dayjs, { Dayjs } from "dayjs";
// import { NavigateBeforeIcon, NavigateNextIcon } from "lib/assets/images/icons";


import { stylesCalendarPicker, stylesSlotProps } from "./styles";
import { CalendarPickerProps } from "./types/CalendarPickerTypes";
import { layoutOptions, useCalendarDispatch, useCalendarState } from "../../contexts";

export function CalendarPicker(props: CalendarPickerProps) {
  const theme = useTheme();
  const { selectedDate, memoryLayout, prevDay } = useCalendarState();
  const { setStateCalendar, setPrevDay } = useCalendarDispatch();

  const assignedLayout = useCallback(
    (layout_: layoutOptions) => {
      if (!memoryLayout) return layout_;
      if (layout_ !== layoutOptions.DAY) return layoutOptions.DAY;
      setPrevDay(undefined);
      return memoryLayout;
    },
    [memoryLayout]
  );

  const handleClickPickerDate = (date: dayjs.Dayjs | null) => {
    date &&
      setStateCalendar((prev) => ({
        ...prev,
        selectedDate: startOfDay(date.toDate()),
        ...(isToday(date.toDate()) && {
          layout: assignedLayout(prev.layout)
        })
      }));
  };

  const handleDoubleClick =
    (day: Dayjs) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (
        e.detail > 1 &&
        (dayjs(prevDay).isSame(startOfDay(day.toDate())) ||
          prevDay === undefined)
      ) {
        setPrevDay(startOfDay(day.toDate()));
        setStateCalendar((prev) => ({
          ...prev,
          selectedDate: startOfDay(day.toDate()),
          layout: assignedLayout(prev.layout)
        }));
      }
    };

  return (
    <DateCalendar
      sx={stylesCalendarPicker}
      value={dayjs(selectedDate)}
      onChange={handleClickPickerDate}
      slots={{
        day: (props) => (
          <PickersDay onClick={handleDoubleClick(props.day)} {...props} />
        ),
        nextIconButton: (props) => (
          <Tooltip arrow placement="top" title="Next month">
            <IconButton {...props} title={undefined}>
              {/* <NavigateNextIcon /> */}
            </IconButton>
          </Tooltip>
        ),
        previousIconButton: (props) => (
          <Tooltip arrow placement="top" title="Previous month">
            <IconButton {...props} title={undefined}>
              {/* <NavigateBeforeIcon /> */}
            </IconButton>
          </Tooltip>
        )
      }}
      slotProps={{
        day: {
          sx: {
            ...stylesSlotProps,
            ...props?.sxDaysProps,
            "&.Mui-selected": {
              backgroundColor: theme.palette.secondary.light,
              border: `1px solid`,
              borderColor: theme.palette.common.black,
              color: theme.palette.getContrastText(
                theme.palette.secondary.light
              )
            }
          } as SxProps
        }
      }}
    />
  );
}
