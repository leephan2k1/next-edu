export function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export function getFirstAndLastDayOfCurrWeek(): [first: Date, last: Date] {
  // get current date
  const curr = new Date();
  // First day is the day of the month - the day of the week
  const first = curr.getDate() - curr.getDay() + 1;
  const last = first + 6; // last day is the first day + 6

  const firstday = new Date(curr.setDate(first));
  const lastday = new Date(curr.setDate(last));

  return [firstday, lastday];
}
