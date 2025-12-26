import { Market } from "@/data/markets";
import { formatTime } from "./time";

function parseTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return { hour, minute };
}

function isTimeBetween(
  now: Date,
  open: string,
  close: string,
  timezone: string
) {
  const { hour: oh, minute: om } = parseTime(open);
  const { hour: ch, minute: cm } = parseTime(close);

  const zoned = new Date(
    new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(now)
  );

  const openDate = new Date(zoned);
  openDate.setHours(oh, om, 0, 0);

  const closeDate = new Date(zoned);
  closeDate.setHours(ch, cm, 0, 0);

  return zoned >= openDate && zoned <= closeDate;
}

export function computeMarket(market: Market, now: Date) {
  const localTime = formatTime(now, market.timezone, "en-US");
  const iranTime = formatTime(now, "Asia/Tehran", "fa-IR");
  const utcTime = formatTime(now, "UTC", "en-US");

  const localDay = new Intl.DateTimeFormat("en-US", {
    timeZone: market.timezone,
    weekday: "short",
  })
    .formatToParts(now)
    .find((p) => p.type === "weekday")?.value;

  const dayIndexMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const dayIndex = dayIndexMap[localDay ?? "Sun"];

  const isWorkingDay = market.daysOpen.includes(dayIndex);

  const isOpen =
    isWorkingDay &&
    isTimeBetween(now, market.openTime, market.closeTime, market.timezone);

  return {
    ...market,
    localTime,
    iranTime,
    utcTime,
    isOpen,
  };
}
