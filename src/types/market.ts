import { Market } from "@/data/markets";

export interface ComputedMarket extends Market {
  localTime: string;
  iranTime: string;
  utcTime: string;
  isOpen: boolean;
}
