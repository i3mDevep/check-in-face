import { SelectChangeEvent } from "@mui/material";

export interface SelectLayoutCalendarBaseProps<Option> {
  onChangeSelect: (event: SelectChangeEvent) => void;
  valueSelected: string | undefined;
  options: Option;
}
