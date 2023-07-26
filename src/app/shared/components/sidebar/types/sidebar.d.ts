import { ReactNode } from "react";

export type SidebarTypes = {
  path?: string,
  child?: SidebarTypes[],
  sidebarProps?: {
    displayText: string,
    icon?: ReactNode;
  };
};