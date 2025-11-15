export type CoinId = 'bitcoin' | 'ethereum' | 'solana';
export type StatId = 'btc' | 'eth' | 'sol';

export type MarketDataPoint = {
  timestamp: number;
  value: number;
};

export type CoinMarketData = {
  usd: number;
  usd_24h_change: number;
  history: MarketDataPoint[];
};

export type MarketData = Record<CoinId, CoinMarketData>;

export type Stat = {
  id: StatId;
  title: string;
  apiKey: CoinId;
};