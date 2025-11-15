// src/App.tsx
import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { StatsCard } from './components/StatCard';
import { CoinDetails } from './components/CoinDetails';
import { fetchMarketData } from './api/marketData';
import type { MarketData, Stat, StatId } from './types';

const stats: Stat[] = [
  { id: 'btc', title: 'Bitcoin', apiKey: 'bitcoin' },
  { id: 'eth', title: 'Ethereum', apiKey: 'ethereum' },
  { id: 'sol', title: 'Solana', apiKey: 'solana' },
];

function App() {
  const [data, setData] = useState<MarketData | null>(null);
  const [selectedId, setSelectedId] = useState<StatId | null>('btc');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  async function loadData() {
    try {
      setIsLoading(true);
      setError(null);

      const marketData = await fetchMarketData();
      setData(marketData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // initial fetch
    loadData();

    // auto-refresh every 60s
    const interval = setInterval(loadData, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout
      isLoading={isLoading}
      error={error}
      lastUpdated={lastUpdated}
      onRefresh={loadData}
    >
      <div className="p-4">
        {isLoading && !data && <p>Loading prices…</p>}
        {error && (
          <p className="mb-4 text-sm text-red-400">
            Error: {error}
          </p>
        )}

        {data && (
          <>
            <div className="grid gap-4 mb-6 sm:grid-cols-3">
              {stats.map((stat) => {
                const coin = data[stat.apiKey];

                const value = `$${coin.usd.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}`;
                const change = `${coin.usd_24h_change.toFixed(2)}%`;

                return (
                  <StatsCard
                    key={stat.id}
                    title={stat.title}
                    value={value}
                    change={change}
                    onClick={() => setSelectedId(stat.id)}
                    isActive={stat.id === selectedId}
                  />
                );
              })}
            </div>

            <CoinDetails selectedId={selectedId} data={data} />
          </>
        )}
      </div>
    </Layout>
  );
}

export default App;
