// src/App.tsx
import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { StatsCard } from './components/StatCard';
import { fetchMarketData } from './api/marketData';
import { CoinDetails } from './components/CoinDetails';
import type { MarketData, Stat } from './types';

const stats: Stat[] = [
  { id: 'btc', title: 'Bitcoin', apiKey: 'bitcoin' },
  { id: 'eth', title: 'Ethereum', apiKey: 'ethereum' },
  { id: 'sol', title: 'Solana', apiKey: 'solana' },
];

function App() {
  const [data, setData] = useState<MarketData | null>(null);
  const [selectedId, setSelectedId] =
    useState<'btc' | 'eth' | 'sol' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
    loadData();
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
        {error && <p className="text-red-400">Error: {error}</p>}

        {data && (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {stats.map((stat) => {
                const coin = data[stat.apiKey];

                const value = `$${coin.usd.toLocaleString()}`;
                const changeValue = coin.usd_24h_change;
                const change = `${changeValue.toFixed(2)}%`;
                const isPositive = changeValue >= 0;

                return (
                  <StatsCard
                    key={stat.id}
                    title={stat.title}
                    value={value}
                    change={change}
                    isPositive={isPositive}
                    onClick={() => setSelectedId(stat.id)}
                    sparklinePoints={coin.sparkline}
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
