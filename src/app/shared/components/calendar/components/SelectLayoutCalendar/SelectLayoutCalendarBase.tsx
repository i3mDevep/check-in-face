import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import { SelectLayoutCalendarBaseProps } from "./types/SelectLayoutCalendarTypes";

export const SelectLayoutCalendarBase = <T extends object>({
  onChangeSelect,
  valueSelected,
  options
}: SelectLayoutCalendarBaseProps<T>) => (
  <Box width="90%" mx="auto" sx={{ minWidth: 100 }}>
    <FormControl fullWidth size="small">
      <InputLabel id="layout-calendar-label">Calendar View</InputLabel>
      <Select
        labelId="layout-calendar-select-label"
        id="layout-calendar-select"
        value={valueSelected}
        label="Calendar View"
        onChange={onChangeSelect}
        inputProps={{ "data-testid": "layout-calendar-input-selected" }}
      >
        {Object.values(options).map((option) => (
          <MenuItem key={`option-layout-${option}`} value={option}>
            <Typography textTransform="capitalize"> {option}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
);
