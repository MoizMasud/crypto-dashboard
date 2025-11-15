// src/components/CoinSparkline.tsx
import { useState } from 'react';
import type { MarketDataPoint } from '../types';

type CoinSparklineProps = {
  points: MarketDataPoint[];
  isPositive: boolean;
};

type HoverState = {
  index: number;
  point: MarketDataPoint;
};

const WIDTH = 400;
const HEIGHT = 120;
const PADDING_X = 16;
const PADDING_Y = 16;

export function CoinSparkline({ points, isPositive }: CoinSparklineProps) {
  const [hover, setHover] = useState<HoverState | null>(null);

  if (!points || points.length === 0) {
    return <p className="text-sm text-gray-400">No data</p>;
  }

  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const color = isPositive ? '#22c55e' : '#f97373';

  // we pre-compute coords so we can reuse them for line + hover markers
  const coords = points.map((p, i) => {
    const x =
      PADDING_X +
      ((WIDTH - PADDING_X * 2) * i) / Math.max(points.length - 1, 1);
    const y =
      HEIGHT -
      PADDING_Y -
      ((HEIGHT - PADDING_Y * 2) * (p.value - min)) / range;
    return { x, y, point: p };
  });

  const pathD = coords
    .map((c, i) => (i === 0 ? `M ${c.x} ${c.y}` : `L ${c.x} ${c.y}`))
    .join(' ');

  const first = points[0];
  const mid = points[Math.floor(points.length / 2)];
  const last = points[points.length - 1];

  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });

  const active = hover ?? {
    index: coords.length - 1,
    point: points[points.length - 1],
  };
  const activeCoord = coords[active.index];

  return (
    <div className="relative mt-10">
      {/* Tooltip above the chart */}
      {active && (
        <div className="absolute -top-8 left-0 text-sm text-gray-200">
          <span className="font-medium">
            {formatTime(active.point.timestamp)}
          </span>{' '}
          · ${active.point.value.toFixed(2)}
        </div>
      )}

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-32"
        aria-hidden="true"
      >
        {/* baseline */}
        <line
          x1={PADDING_X}
          y1={HEIGHT - PADDING_Y}
          x2={WIDTH - PADDING_X}
          y2={HEIGHT - PADDING_Y}
          stroke="#4b5563"
          strokeWidth={1}
        />

        {/* main sparkline */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* hover vertical line + active dot */}
        {activeCoord && (
          <>
            <line
              x1={activeCoord.x}
              y1={PADDING_Y / 2}
              x2={activeCoord.x}
              y2={HEIGHT - PADDING_Y}
              stroke={color}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <circle
              cx={activeCoord.x}
              cy={activeCoord.y}
              r={4}
              fill={color}
              stroke="#111827"
              strokeWidth={1}
            />
          </>
        )}

        {/* hover targets: small transparent circles that set hover state */}
        {coords.map((c, index) => (
          <circle
            key={index}
            cx={c.x}
            cy={c.y}
            r={8}
            fill="transparent"
            onMouseEnter={() =>
              setHover({ index, point: c.point })
            }
            onMouseLeave={() => setHover(null)}
            style={{ cursor: 'pointer' }}
          />
        ))}

        {/* time labels on x-axis */}
        <text
          x={PADDING_X}
          y={HEIGHT - 4}
          fontSize="10"
          fill="#9ca3af"
        >
          {formatTime(first.timestamp)}
        </text>
        <text
          x={WIDTH / 2}
          y={HEIGHT - 4}
          fontSize="10"
          fill="#9ca3af"
          textAnchor="middle"
        >
          {formatTime(mid.timestamp)}
        </text>
        <text
          x={WIDTH - PADDING_X}
          y={HEIGHT - 4}
          fontSize="10"
          fill="#9ca3af"
          textAnchor="end"
        >
          {formatTime(last.timestamp)}
        </text>
      </svg>
    </div>
  );
}
