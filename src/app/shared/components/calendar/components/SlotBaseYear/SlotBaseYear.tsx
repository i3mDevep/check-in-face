import { ReactNode, useEffect, useState } from "react";

import { IconButton } from "@mui/material";
import Popper from "@mui/material/Popper";
import { styled } from "@mui/material/styles";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";

import {
  CustomizationYearSlot,
  MultiplePickersDaysProps,
  ResourceType
} from "./types/SlotBaseYearTypes";
import { CalendarSlotBaseProps } from "../../hoc";
import { useCalendarDispatch } from "../../contexts";

dayjs.extend(isBetweenPlugin);

const MultiplePickersDays = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    [
      "dayIsHighlight",
      "colorHighlight",
      "backgroundColorHighlight",
      "backgroundColorHighlightHover",
      "borderHighligh"
    ].reduce((condition, item) => condition && prop !== item, true)
})<MultiplePickersDaysProps>(
  ({
    theme,
    dayIsHighlight,
    colorHighlight,
    backgroundColorHighlight,
    backgroundColorHighlightHover,
    borderHighligh
  }) => ({
    ...(borderHighligh && {
      border: `1px solid`,
      borderColor: theme.palette.common.black
    }),
    ...(dayIsHighlight && {
      backgroundColor:
        backgroundColorHighlight ?? theme.palette.secondary.light,
      color:
        colorHighlight ??
        theme.palette.getContrastText(
          backgroundColorHighlight ?? theme.palette.secondary.light
        ),
      "&:hover, &:focus": {
        backgroundColor:
          backgroundColorHighlightHover ?? theme.palette.secondary.light
      }
    })
  })
) as React.ComponentType<MultiplePickersDaysProps>;

export const SlotBaseYear = (
  props: CalendarSlotBaseProps<
    ResourceType,
    PickersDayProps<dayjs.Dayjs> & {
      children: ReactNode;
    } & CustomizationYearSlot & {
        isSlotSelected: boolean;
      }
  >
) => {
  const {
    children,
    day,
    resourceList,
    popperProps,
    autoClosePopper,
    hiddenButtonClose,
    onClickDay,
    forceClose,
    isSlotSelected,
    today,
    ...other
  } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { changeSelectDayInView } = useCalendarDispatch();

  useEffect(() => {
    if (forceClose !== undefined) handlePopoverClose(true)();
  }, [forceClose]);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handlePopoverClose = (allowClose: boolean) => () =>
    allowClose && setAnchorEl(null);

  const open = Boolean(anchorEl);

  if (!resourceList?.length && !isSlotSelected) {
    return (
      <PickersDay
        day={day}
        onClick={() => changeSelectDayInView(day.toDate())}
        sx={{
          "&.MuiPickersDay-today": {
            backgroundColor: "secondary.light",
            border: "none"
          }
        }}
        today={today}
        {...other}
      />
    );
  }

  return (
    <>
      <MultiplePickersDays
        {...other}
        day={day}
        dayIsHighlight
        borderHighligh={isSlotSelected}
        onClick={() => {
          changeSelectDayInView(day.toDate());
          onClickDay?.();
        }}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose(!!autoClosePopper)}
      />
      {resourceList.length > 0 && (
        <Popper open={open} anchorEl={anchorEl} {...popperProps}>
          {!hiddenButtonClose && (
            <IconButton
              size="small"
              sx={{ position: "absolute", top: 1, right: 1, zIndex: 2 }}
              onClick={handlePopoverClose(true)}
            >
              {/* <CloseIcon /> */}
            </IconButton>
          )}
          {children}
        </Popper>
      )}
    </>
  );
};
