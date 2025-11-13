interface StatCardProps {
  title: string;
  value: string;
  change: string;
}

export function StatsCard({ title, value, change }: StatCardProps) {
  const isPositive = change.startsWith("+");
  return (
    <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
      <div className="text-neutral-400 text-sm mb-1">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {change && (
      <p className={`${isPositive ? "text-green-400" : "text-red-400"} font-medium`}>
        {change}
      </p>

      )}
    </div>
  );
}
