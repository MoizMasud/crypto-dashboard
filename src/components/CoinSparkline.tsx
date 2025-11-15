// CoinSparkline.tsx
type CoinSparklineProps = {
  points: number[];
  isPositive: boolean;
};

export function CoinSparkline({ points, isPositive }: CoinSparklineProps) {
  if (!points.length) {
    return (
      <div className="h-16 flex items-center justify-center text-xs text-gray-400">
        No data
      </div>
    );
  }

  const width = 120;
  const height = 40;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;

  const path = points
    .map((value, index) => {
      const x = (index / (points.length - 1 || 1)) * width;
      // flip Y so higher prices are up, and add a small vertical padding
      const normalized = (value - min) / range;
      const padding = 4;
      const y = height - padding - normalized * (height - padding * 2);
      return `${index === 0 ? 'M' : 'L'} ${x},${y}`;
    })
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-16 overflow-visible"
      preserveAspectRatio="none"
    >
      {/* baseline */}
      <line
        x1="0"
        y1={height - 2}
        x2={width}
        y2={height - 2}
        className="stroke-gray-700"
        strokeWidth="0.5"
      />
      {/* path */}
      <path
        d={path}
        fill="none"
        className={isPositive ? 'stroke-green-400' : 'stroke-red-400'}
        strokeWidth="1.5"
      />
    </svg>
  );
}

