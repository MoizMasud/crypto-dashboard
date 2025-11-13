import { Layout } from "./components/Layout";
import { StatsCard } from "./components/StatCard";
import { useCryptoData } from "./hooks/useCryptoData";

type StatId = 'bitcoin' | 'ethereum' | 'solana';

type Stat = {
  id: StatId;
  title: string;
};

const stats: Stat[] = [
  { id: 'bitcoin', title: 'Bitcoin' },
  { id: 'ethereum', title: 'Ethereum' },
  { id: 'solana', title: 'Solana' },
];

function App() {
  const { data, loading } = useCryptoData();
  if (loading) {
    return (
      <Layout>
        <div className="p-4 text-gray-400">Loading market data…</div>
      </Layout>
    );
  }
  return (
  <Layout>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {stats.map((stat) => {
        if (!data)  return null;
        const coin = data[stat.id];

        const value = `$${coin.usd.toLocaleString()}`;
        const change = `${coin.usd_24h_change.toFixed(2)}%`;

        return (
          <StatsCard
            key={stat.id}
            title={stat.title}
            value={value}
            change={change}
          />
        );
      })}
    </div>
  </Layout>
);

}

export default App;