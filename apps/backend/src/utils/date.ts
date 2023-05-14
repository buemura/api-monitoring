export function getDateDiff(date1: Date, date2: Date) {
  const date1Timestamp = Date.parse(date1.toString());
  const date2Timestamp = Date.parse(date2.toString());
  return date1Timestamp - date2Timestamp;
}
