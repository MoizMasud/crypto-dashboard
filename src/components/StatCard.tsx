// src/components/StatCard.tsx
export type StatsCardProps = {
  title: string;
  value: string;
  change: string;
  onClick?: () => void;
  isActive?: boolean;   // 👈 NEW
};

export function StatsCard({
  title,
  value,
  change,
  onClick,
  isActive = false,     // 👈 default
}: StatsCardProps) {
  const isPositive = change.startsWith('+');

  const cardClasses = [
    'rounded-xl p-4 shadow-md cursor-pointer transition',
    isActive
      ? 'bg-gray-800 ring-2 ring-emerald-400 scale-[1.02]'
      : 'bg-gray-800 hover:ring-1 hover:ring-gray-600 hover:scale-[1.01]',
  ].join(' ');

  return (
    <button className={cardClasses} onClick={onClick} type="button">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl mt-2">{value}</p>
      <p className={isPositive ? 'text-green-400' : 'text-red-400'}>
        {change}
      </p>
    </button>
  );
}


