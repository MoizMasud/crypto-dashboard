import { Layout } from "./components/Layout";
import { StatsCard } from "./components/StatCard";


type Stat = {
  id: string;
  title: string;
  value: string;
  change: string;
};

const stats: Stat[] = [
  { id: 'btc', title: 'Bitcoin', value: '$67,200', change: '+2.5%' },
  { id: 'eth', title: 'Ethereum', value: '$3,200', change: '-1.2%' },
  { id: 'sol', title: 'Solana', value: '$185', change: '+0.9%' },
];

function App() {
  return (
    <Layout>
        <div className="grid gap-4 p-4 md:grid-cols-3 sm:grid-cols-1">
          {stats.map((s) => (
            <StatsCard
              key={s.id}
              title={s.title}
              value={s.value}
              change={s.change}
            />
        ))}
      </div>
    </Layout>
  );
}

export default App;