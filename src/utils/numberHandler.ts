export function getTime(currentTimeInSecond: number) {
  const dateObj = new Date(currentTimeInSecond * 1000);
  // const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getSeconds();

  return (
    // hours.toString().padStart(2, '0') +
    // ':' +
    minutes.toString().padStart(2, '0') +
    ':' +
    seconds.toString().padStart(2, '0')
  );
}
