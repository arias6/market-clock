export interface Market {
  id: string;
  name: {
    en: string;
    fa: string;
  };
  city: {
    en: string;
    fa: string;
  };
  country: {
    en: string;
    fa: string;
  };
  timezone: string;
  utcOffset: number;
  openTime: string;
  closeTime: string;
  daysOpen: number[];
  color: string;
  type: "forex" | "stock" | "crypto" | "commodity";
}

export const markets: Market[] = [
  {
    id: "sydney",
    name: {
      en: "Sydney Stock Exchange",
      fa: "بورس سیدنی",
    },
    city: {
      en: "Sydney",
      fa: "سیدنی",
    },
    country: {
      en: "Australia",
      fa: "استرالیا",
    },
    timezone: "Australia/Sydney",
    utcOffset: 11,
    openTime: "10:00",
    closeTime: "16:00",
    daysOpen: [1, 2, 3, 4, 5],
    color: "#10B981",
    type: "stock",
  },
  {
    id: "tokyo",
    name: {
      en: "Tokyo Stock Exchange",
      fa: "بورس توکیو",
    },
    city: {
      en: "Tokyo",
      fa: "توکیو",
    },
    country: {
      en: "Japan",
      fa: "ژاپن",
    },
    timezone: "Asia/Tokyo",
    utcOffset: 9,
    openTime: "09:00",
    closeTime: "15:00",
    daysOpen: [1, 2, 3, 4, 5],
    color: "#EF4444",
    type: "stock",
  },
  {
    id: "shanghai",
    name: {
      en: "Shanghai Stock Exchange",
      fa: "بورس شانگهای",
    },
    city: {
      en: "Shanghai",
      fa: "شانگهای",
    },
    country: {
      en: "China",
      fa: "چین",
    },
    timezone: "Asia/Shanghai",
    utcOffset: 8,
    openTime: "09:30",
    closeTime: "15:00",
    daysOpen: [1, 2, 3, 4, 5],
    color: "#F59E0B",
    type: "stock",
  },
  {
    id: "frankfurt",
    name: {
      en: "Frankfurt Stock Exchange",
      fa: "بورس فرانکفورت",
    },
    city: {
      en: "Frankfurt",
      fa: "فرانکفورت",
    },
    country: {
      en: "Germany",
      fa: "آلمان",
    },
    timezone: "Europe/Berlin",
    utcOffset: 1,
    openTime: "09:00",
    closeTime: "17:30",
    daysOpen: [1, 2, 3, 4, 5],
    color: "#8B5CF6",
    type: "stock",
  },
  {
    id: "london",
    name: {
      en: "London Stock Exchange",
      fa: "بورس لندن",
    },
    city: {
      en: "London",
      fa: "لندن",
    },
    country: {
      en: "United Kingdom",
      fa: "انگلستان",
    },
    timezone: "Europe/London",
    utcOffset: 0,
    openTime: "08:00",
    closeTime: "16:30",
    daysOpen: [1, 2, 3, 4, 5],
    color: "#3B82F6",
    type: "stock",
  },
  {
    id: "newyork",
    name: {
      en: "New York Stock Exchange",
      fa: "بورس نیویورک",
    },
    city: {
      en: "New York",
      fa: "نیویورک",
    },
    country: {
      en: "United States",
      fa: "ایالات متحده",
    },
    timezone: "America/New_York",
    utcOffset: -5,
    openTime: "09:30",
    closeTime: "16:00",
    daysOpen: [1, 2, 3, 4, 5],
    color: "#06B6D4",
    type: "stock",
  },
  {
    id: "tehran",
    name: {
      en: "Tehran Stock Exchange",
      fa: "بورس تهران",
    },
    city: {
      en: "Tehran",
      fa: "تهران",
    },
    country: {
      en: "Iran",
      fa: "ایران",
    },
    timezone: "Asia/Tehran",
    utcOffset: 3.5,
    openTime: "09:00",
    closeTime: "12:30",
    daysOpen: [6, 0, 1, 2, 3],
    color: "#14B8A6",
    type: "stock",
  },
  {
    id: "forex",
    name: {
      en: "Forex Market",
      fa: "بازار فارکس",
    },
    city: {
      en: "Global",
      fa: "جهانی",
    },
    country: {
      en: "Worldwide",
      fa: "سراسر جهان",
    },
    timezone: "UTC",
    utcOffset: 0,
    openTime: "00:00",
    closeTime: "23:59",
    daysOpen: [0, 1, 2, 3, 4, 5, 6],
    color: "#EC4899",
    type: "forex",
  },
];
