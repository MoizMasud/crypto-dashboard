// src/api/marketData.ts
import type { MarketData } from '../types';

const API_URL =
  'https://api.coingecko.com/api/v3/simple/price' +
  '?ids=bitcoin,ethereum,solana' +
  '&vs_currencies=usd' +
  '&include_24hr_change=true';

export async function fetchMarketData(): Promise<MarketData> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error(`Failed to fetch market data: ${res.status}`);
  }

  const json = await res.json();

  return {
    bitcoin: {
      usd: json.bitcoin.usd,
      usd_24h_change: json.bitcoin.usd_24h_change,
    },
    ethereum: {
      usd: json.ethereum.usd,
      usd_24h_change: json.ethereum.usd_24h_change,
    },
    solana: {
      usd: json.solana.usd,
      usd_24h_change: json.solana.usd_24h_change,
    },
  };
}
