export function getFirstDayOfMonth({
  year,
  month,
}: {
  year: number;
  month: number;
}): number {
  return new Date(year, month, 1).getDay();
}

export function getDaysInMonth({
  year,
  month,
}: {
  year: number;
  month: number;
}): number {
  return [
    31,
    isLeapYear({ year }) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ][month];
}
export function isLeapYear({ year }: { year: number }) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
