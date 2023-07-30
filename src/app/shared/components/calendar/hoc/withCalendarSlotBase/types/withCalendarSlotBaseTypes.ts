import { ReactNode } from "react";

import { Dayjs } from "dayjs";

export interface PropsBase {
  day: Dayjs | Date;
  isSlotSelected: boolean;
}

export type CalendarSlotBaseProps<D, P extends PropsBase> = P & {
  children?: ReactNode;
  resourceList: (D & { date: Dayjs | Date })[];
};
