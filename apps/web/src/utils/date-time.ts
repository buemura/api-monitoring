export function milisecondsToSeconds(ms: number) {
  return ms / 1000;
}

export function milisecondsToMinutes(ms: number) {
  return ms / 60000;
}

const leadingZero = (num: number) => `0${num}`.slice(-2);

export function formatDate(pattern: string, date: Date): string {
  switch (pattern) {
    case "yyyy-mm-dd hh-mm-ss": {
      const unformattedDate = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
      ];
      const unformattedTime = [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ];

      const formattedDate = unformattedDate.join("-");
      const formattedTime = unformattedTime.map(leadingZero).join(":");
      return `${formattedDate} ${formattedTime}`;
    }
    default:
      return date.toString();
  }
}
