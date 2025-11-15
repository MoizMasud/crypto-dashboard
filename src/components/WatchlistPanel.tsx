// src/components/Watchlist.tsx
import type { MarketData, StatId } from '../types';
import { coinIcons } from '../components/CoinIcons';

type WatchlistProps = {
  watchlist: StatId[];
  data: MarketData;
  onSelect: (id: StatId) => void;
};

const LABEL_MAP: Record<StatId, string> = {
  btc: 'Bitcoin',
  eth: 'Ethereum',
  sol: 'Solana',
};

export function Watchlist({ watchlist, data, onSelect }: WatchlistProps) {
  if (watchlist.length === 0) return null;
  if (!data) return null;
  return (
    <section className="mt-10">
      {/* header */}
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-lg font-semibold">Watchlist</h2>
        <span className="px-2 py-0.5 rounded-full bg-gray-800 text-xs text-gray-300">
          {watchlist.length} asset{watchlist.length > 1 && 's'}
        </span>
      </div>

      {/* card container */}
      <div className=" border bg-gray-900 border-gray-800  shadow-inner overflow-hidden">
        {watchlist.map((id, index) => {
          const key =
            id === 'btc' ? 'bitcoin' : id === 'eth' ? 'ethereum' : 'solana';

          const coin = data[key];
          const isPositive = coin.usd_24h_change >= 0;

          const price = `$${coin.usd.toLocaleString()}`;
          const change = `${coin.usd_24h_change.toFixed(2)}%`;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
                className={`w-full flex bg-gray-900 items-center justify-between px-4 py-3 text-left transition-colors hover:bg-gray-800/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                index !== watchlist.length - 1 ? 'mb-5' : ''
                }`}
            >
              {/* left side: avatar + name */}
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br flex items-center justify-center text-xs font-semibold">
                   {coinIcons[id]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{LABEL_MAP[id]}</span>
                  </div>
                  <p className="text-xs text-gray-400">On your watchlist</p>
                </div>
              </div>
              

              {/* right side: price + change */}
              <div className="text-right space-y-1">
                <div className="font-mono text-sm">{price}</div>
                <div
                  className={`text-xs ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {change}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
