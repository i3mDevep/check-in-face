import { PopperProps } from "@mui/material";
import { PickersDayProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

export interface CustomizationYearSlot {
  colorHighlight?: string;
  backgroundColorHighlight?: string;
  backgroundColorHighlightHover?: string;
  popperProps?: PopperProps;
  autoClosePopper?: boolean;
  hiddenButtonClose?: boolean;
  forceClose?: boolean;
  onClickDay?: () => void;
}

export interface MultiplePickersDaysProps
  extends PickersDayProps<Dayjs>,
    CustomizationYearSlot {
  dayIsHighlight: boolean;
  borderHighligh?: boolean;
}

export type ResourceType = {
  date: Dayjs;
};
