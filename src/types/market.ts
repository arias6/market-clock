import { Market } from "@/data/markets";

export interface ComputedMarket extends Market {
  localTime: string;
  iranTime: string;
  utcTime: string;
  isOpen: boolean;
}

export interface HeroText {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
}
