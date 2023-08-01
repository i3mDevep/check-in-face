import { SelectChangeEvent } from "@mui/material/Select";

import { SelectLayoutCalendarBase } from "./SelectLayoutCalendarBase";
import { layoutOptions, useCalendarDispatch, useCalendarState } from "../../contexts";

export const SelectLayoutCalendar = () => {
  const { layout, layoutOptionsAllow } = useCalendarState();

  const { setStateCalendar, setMemoryLayout, setPrevDay } =
    useCalendarDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    setMemoryLayout(undefined);
    setPrevDay(undefined);
    setStateCalendar((prev) => ({
      ...prev,
      layout: event.target.value as layoutOptions
    }));
  };


  return (
    <SelectLayoutCalendarBase
      onChangeSelect={handleChange}
      options={layoutOptionsAllow ? layoutOptionsAllow: layoutOptions}
      valueSelected={layout}
    />
  );
};
