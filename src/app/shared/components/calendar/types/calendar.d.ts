/* eslint-disable @typescript-eslint/no-explicit-any */
export type SlotOptions = "year" | "month" | "week" | "day";

export interface CalendarSlots<SlotProps> {
  slot?: Partial<Record<SlotOptions, (props: SlotProps & any) => JSX.Element | JSX.Element[]>>;
  slotProps?:  SlotProps & any
}
