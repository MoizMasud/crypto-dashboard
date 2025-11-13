type Props = {
  title: string;
  value: string;
  change: string;
  onClick?: () => void;
};

export function StatsCard({ title, value, change, onClick }: Props) {
  const isPositive = change.startsWith('+');

  return (
    <div
      className="bg-gray-800 rounded-xl p-4 shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
      onClick={onClick}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl mt-2">{value}</p>
      <p className={isPositive ? 'text-green-400' : 'text-red-400'}>
        {change}
      </p>
    </div>
  );
}

