import type { MarketDataPoint } from "../types";
import { CoinSparkline } from "./CoinSparkline";

type StatsCardProps = {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  onClick?: () => void;
  sparklinePoints: MarketDataPoint[];
};

export function StatsCard({
  title,
  value,
  change,
  isPositive,
  onClick,
  sparklinePoints,
}: StatsCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-800 rounded-xl p-4 shadow-md w-full text-left hover:bg-gray-750 transition-colors"
    >
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="text-sm font-medium text-gray-300">{title}</h2>
        <span
          className={`text-xs font-semibold ${
            isPositive ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {change}
        </span>
      </div>

      <p className="text-2xl font-semibold mb-2">{value}</p>

      <div className="mt-2">
       <CoinSparkline
          points={sparklinePoints.map((p) => p.price)}
          isPositive={isPositive}
        />
      </div>
    </button>
  );
}


