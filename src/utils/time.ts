export function formatTime(
  date: Date,
  timezone: string,
  locale: "fa-IR" | "en-US" = "en-US"
) {
  return new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

export function getIranTime(date: Date) {
  return formatTime(date, "Asia/Tehran", "fa-IR");
}

export function getUtcTime(date: Date) {
  return formatTime(date, "UTC", "en-US");
}
