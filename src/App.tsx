import { Layout } from "./components/Layout";
import { StatCard } from "./components/StatCard";

export default function App() {
  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Bitcoin" value="$64,200" change="+2.1%" positive />
        <StatCard title="Ethereum" value="$3,410" change="-0.4%" />
        <StatCard title="Portfolio Value" value="$18,530" />
        <StatCard title="24h Volume" value="$3.2B" />
      </div>
    </Layout>
  );
}