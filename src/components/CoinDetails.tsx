type CoinKey = 'bitcoin' | 'ethereum' | 'solana';

type CoinInfo = {
  usd: number;
  usd_24h_change: number;
};

type MarketData = Record<CoinKey, CoinInfo>;

type Props = {
  selectedId: 'btc' | 'eth' | 'sol' | null;
  data: MarketData;
};

const idToApiKey: Record<'btc' | 'eth' | 'sol', CoinKey> = {
  btc: 'bitcoin',
  eth: 'ethereum',
  sol: 'solana',
};

const idToLabel: Record<'btc' | 'eth' | 'sol', string> = {
  btc: 'Bitcoin',
  eth: 'Ethereum',
  sol: 'Solana',
};

export function CoinDetails({ selectedId, data }: Props) {
  if (!selectedId) {
    return (
      <div className="bg-gray-800 rounded-xl p-4">
        <p className="text-gray-400">
          Click a card above to see more details.
        </p>
      </div>
    );
  }

  const key = idToApiKey[selectedId];
  const coin = data[key];

  const price = `$${coin.usd.toLocaleString()}`;
  const change = coin.usd_24h_change.toFixed(2);
  const isPositive = coin.usd_24h_change >= 0;

  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-2">
        {idToLabel[selectedId]} details
      </h2>
      <p className="text-3xl mb-4">{price}</p>
      <p className={isPositive ? 'text-green-400' : 'text-red-400'}>
        24h change: {change}%
      </p>
      <p className="text-gray-400 mt-4 text-sm">
        (Day 6: simple detail panel. Later we’ll turn this into charts, volume,
        and more Coinbase-style data.)
      </p>
    </div>
  );
}