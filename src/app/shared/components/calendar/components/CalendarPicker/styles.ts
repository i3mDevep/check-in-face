import { SxProps } from "@mui/material";

export const stylesCalendarPicker: SxProps = {
  "&.MuiDateCalendar-root": {
    maxWidth: "100%",
    "& .MuiPickersCalendarHeader-root > .MuiPickersCalendarHeader-labelContainer":
      {
        fontWeight: "inherit"
      }
  }
};

export const stylesSlotProps: SxProps = {
  "&.Mui-selected:hover": {
    backgroundColor: "secondary.light"
  },
  "&.Mui-selected:focus": {
    backgroundColor: "secondary.light"
  },
  "&.MuiPickersDay-today": {
    backgroundColor: "secondary.light",
    border: "none"
  }
};
