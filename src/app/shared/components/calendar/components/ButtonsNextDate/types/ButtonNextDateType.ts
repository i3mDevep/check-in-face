export enum formatMode {
  year = "YYYY",
  month = "MMMM YYYY",
  week = "MMMM D, YYYY",
  day = "MMMM D, YYYY"
}

export interface ButtonsNextDateProps {
  mode: keyof typeof formatMode;
  currentDate: Date;
  onChangeDate: (newDate: Date) => void;
}
