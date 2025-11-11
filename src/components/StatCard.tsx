interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
}

export function StatCard({ title, value, change, positive }: StatCardProps) {
  return (
    <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
      <div className="text-neutral-400 text-sm mb-1">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {change && (
        <div className={`text-sm ${positive ? "text-green-400" : "text-red-400"}`}>
          {change}
        </div>
      )}
    </div>
  );
}
