export function generateHourList(): string[] {
  const hours = Array.from({ length: 24 }, (_, hour) => hour.toString());
  return hours;
}
