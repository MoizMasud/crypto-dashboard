import { CoinSparkline } from './CoinSparkline';
import type { MarketData, StatId } from '../types';

type Props = {
  selectedId: StatId | null;
  data: MarketData;
};

export function CoinDetails({ selectedId, data }: Props) {
  if (!selectedId) return null;

  const coinKey =
    selectedId === 'btc'
      ? 'bitcoin'
      : selectedId === 'eth'
      ? 'ethereum'
      : 'solana';

  const coin = data[coinKey];

  const isPositive = coin.usd_24h_change >= 0;

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-2">
        {coinKey.charAt(0).toUpperCase() + coinKey.slice(1)} details
      </h2>

      <p className="text-sm text-gray-300 mb-3">
        Price: <span className="font-mono">${coin.usd.toLocaleString()}</span>{' '}
        · 24h change:{' '}
        <span className={isPositive ? 'text-green-400' : 'text-red-400'}>
          {coin.usd_24h_change.toFixed(2)}%
        </span>
      </p>

      <CoinSparkline points={coin.history} isPositive={isPositive} />
    </div>
  );
}

