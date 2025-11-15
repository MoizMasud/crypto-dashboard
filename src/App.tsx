// src/App.tsx
import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { StatsCard } from './components/StatCard';
import { CoinDetails } from './components/CoinDetails';
import { Watchlist } from './components/WatchlistPanel';
import { fetchMarketData } from './api/marketData';
import type { MarketData, Stat, StatId } from './types';
import { coinIcons } from './components/CoinIcons';

const stats: Stat[] = [
  { id: 'btc', title: 'Bitcoin', apiKey: 'bitcoin' },
  { id: 'eth', title: 'Ethereum', apiKey: 'ethereum' },
  { id: 'sol', title: 'Solana', apiKey: 'solana' },
];

function App() {
  const [data, setData] = useState<MarketData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<StatId | null>('btc');
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // 🆕 watchlist state: start with all three, or [] if you prefer
  const [watchlist, setWatchlist] = useState<StatId[]>(['btc', 'eth', 'sol']);

  function toggleWatchlist(id: StatId) {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

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

  if (!data) {
    return (
      <Layout
        isLoading={isLoading}
        error={error}
        lastUpdated={lastUpdated}
        onRefresh={loadData}
      >
        <div className="p-4">
          {error ? (
            <p className="text-red-400">Error: {error}</p>
          ) : (
            <p>Loading prices…</p>
          )}
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      isLoading={isLoading}
      error={error}
      lastUpdated={lastUpdated}
      onRefresh={loadData}
    >
      <div className="p-4">
        <div className="grid gap-4 mb-6
          grid-cols-1          /* phones: 1 per row */
          sm:grid-cols-2       /* ≥640px: 2 per row */
          xl:grid-cols-3">
          {stats.map((stat) => {
            const coin = data[stat.apiKey]; // fine now

            const value = `$${coin.usd.toLocaleString()}`;
            const change = `${coin.usd_24h_change.toFixed(2)}%`;
            const isActive = selectedId === stat.id;
            const inWatchlist = watchlist.includes(stat.id);
            return (
              <StatsCard
                key={stat.id}
                title={stat.title}
                value={value}
                change={change}
                isActive={isActive}
                inWatchlist={inWatchlist}
                onToggleWatchlist={() => toggleWatchlist(stat.id)}
                onClick={() => setSelectedId(stat.id)}
                icon={coinIcons[stat.id as StatId]}
              />
            );
          })}
        </div>

        <CoinDetails selectedId={selectedId} data={data} />

        <Watchlist watchlist={watchlist}
          data={data}
          onSelect={setSelectedId} />
      </div>
    </Layout>
  );
}

export default App;
