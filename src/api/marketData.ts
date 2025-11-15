// src/api/marketData.ts
import type { MarketData, CoinId, MarketDataPoint } from '../types';

const COINS: CoinId[] = ['bitcoin', 'ethereum', 'solana'];

/*
  Fake historical data generator:
  Starts at current price.
  Moves backwards in time in 1-hour steps.
  Adds a small “random-ish” noise using sin/cos (seeded differently per coin so each graph looks unique).
  Produces an array of { timestamp, value } for the sparkline.
 */
function generateSparkline(
  basePrice: number,
  seed: number,
  points = 30
): MarketDataPoint[] {
  const out: MarketDataPoint[] = [];
  let price = basePrice;
  const now = Date.now();

  for (let i = points - 1; i >= 0; i--) {
    const t = now - i * 60 * 60 * 1000;
    const noise =
      ((Math.sin(seed + i) + Math.cos(seed * 1.3 + i * 0.7)) / 12) *
      basePrice *
      0.01;
    price = Math.max(0, price + noise);
    out.push({ timestamp: t, value: Number(price.toFixed(2)) });
  }

  return out;
}

export async function fetchMarketData(): Promise<MarketData> {
  const params = new URLSearchParams({
    ids: COINS.join(','),
    vs_currencies: 'usd',
    include_24hr_change: 'true',
  });

  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch market data');
  }

  const json = await res.json();

  const data: MarketData = {
    bitcoin: {
      usd: json.bitcoin.usd,
      usd_24h_change: json.bitcoin.usd_24h_change,
      history: generateSparkline(json.bitcoin.usd, 1.1),
    },
    ethereum: {
      usd: json.ethereum.usd,
      usd_24h_change: json.ethereum.usd_24h_change,
      history: generateSparkline(json.ethereum.usd, 2.3),
    },
    solana: {
      usd: json.solana.usd,
      usd_24h_change: json.solana.usd_24h_change,
      history: generateSparkline(json.solana.usd, 3.7),
    },
  };

  return data;
}
