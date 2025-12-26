import { markets } from "@/src/data/markets";
import { computeMarket } from "./market-time";

export function getComputedMarkets(now: Date) {
  return markets.map((m) => computeMarket(m, now));
}
