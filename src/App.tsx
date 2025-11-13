// src/App.tsx
import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { StatsCard } from './components/StatCard';
import { fetchMarketData } from './api/marketData';
import type { MarketData, Stat, StatId } from './types';
import { CoinDetails } from './components/CoinDetails';

const stats: Stat[] = [
  { id: 'btc', title: 'Bitcoin',  apiKey: 'bitcoin' },
  { id: 'eth', title: 'Ethereum', apiKey: 'ethereum' },
  { id: 'sol', title: 'Solana',   apiKey: 'solana' },
];

function App() {
  const [data, setData] = useState<MarketData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<StatId | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    loadData(); // initial fetch

    const interval = setInterval(loadData, 60_000); // auto-refresh every 60s
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
        {isLoading && <p>Loading prices…</p>}
        {error && <p className="text-red-400">Error: {error}</p>}

        {data && (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {stats.map((stat) => {
                const coin = data[stat.apiKey];

                const value = `$${coin.usd.toLocaleString()}`;
                const change = `${coin.usd_24h_change.toFixed(2)}%`;

                return (
                  <StatsCard
                    key={stat.id}
                    title={stat.title}
                    value={value}
                    change={change}
                    onClick={() => setSelectedId(stat.id)}
                  />
                );
              })}
            </div>

            <CoinDetails
              selectedId={selectedId}
              data={data}
            />
          </>
        )}
      </div>
    </Layout>
  );
}

export default App;
