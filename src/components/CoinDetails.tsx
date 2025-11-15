// src/components/CoinDetails.tsx
import type { MarketData, StatId } from '../types';

type CoinDetailsProps = {
  selectedId: StatId | null;
  data: MarketData | null;
};

const idToKey: Record<StatId, keyof MarketData> = {
  btc: 'bitcoin',
  eth: 'ethereum',
  sol: 'solana',
};

export function CoinDetails({ selectedId, data }: CoinDetailsProps) {
  if (!selectedId || !data) {
    return (
      <div className="bg-gray-800 rounded-xl p-4 text-gray-400">
        Select a coin above to see more details.
      </div>
    );
  }

  const key = idToKey[selectedId];
  const coin = data[key];

  const isUp = coin.usd_24h_change >= 0;

  return (
    <div className="bg-gray-800 rounded-xl p-4 space-y-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold capitalize">{key}</h2>
        <span
          className={
            'text-sm px-2 py-0.5 rounded-full ' +
            (isUp ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400')
          }
        >
          {isUp ? 'Bullish' : 'Bearish'}
        </span>
      </div>

      <p className="text-3xl font-bold">
        ${coin.usd.toLocaleString()}
      </p>

      <p className={isUp ? 'text-green-400' : 'text-red-400'}>
        24h change: {coin.usd_24h_change.toFixed(2)}%
      </p>

      <div className="text-sm text-gray-400">
        <p>More detail later (volume, market cap, etc.).</p>
        <p>Right now this is your “zoomed-in” panel for the selected coin.</p>
      </div>
    </div>
  );
}

