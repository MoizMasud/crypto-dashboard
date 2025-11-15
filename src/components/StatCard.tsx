import type { ReactNode } from 'react';

export type StatsCardProps = {
  title: string;
  value: string;
  change: string;
  onClick: () => void;
  isActive: boolean;
  inWatchlist: boolean;
  onToggleWatchlist: () => void;
  icon?: ReactNode; // 👈 NEW
};

export function StatsCard({
  title,
  value,
  change,
  onClick,
  isActive,
  inWatchlist,
  onToggleWatchlist,
  icon,
}: StatsCardProps) {
  const isPositive = change.startsWith('+');

  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border px-4 py-3 text-left transition-colors bg-gray-900 border-gray-700 hover:bg-gray-800/80 ${
        isActive ? 'ring-2 ring-indigo-500' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 rounded-full flex items-center justify-center">
              {icon}
            </div>
          )}
          <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-xl font-semibold">{value}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <p className={isPositive ? 'text-green-400' : 'text-red-400'}>
            {change}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatchlist();
            }}
            className="text-xs bg-gray-900 px-2 py-1 rounded-full border hover:bg-gray-800"
          >
            {inWatchlist ? '★ In Watchlist' : '☆ Watch'}
          </button>
        </div>
      </div>
    </button>
  );
}
