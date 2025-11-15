export type CoinId = 'bitcoin' | 'ethereum' | 'solana';

export type CoinInfo = {
  usd: number;
  usd_24h_change: number;
  
};

export type MarketDataPoint = {
  timestamp: number;
  value: number;
};


export type SparkPoint = MarketDataPoint;

// The full market data object
export type MarketData = Record<CoinId, {
  usd: number;
  usd_24h_change: number;
  history: MarketDataPoint[]; // for sparkline
}>;

// IDs you use in your UI
export type StatId = 'btc' | 'eth' | 'sol';

// One stat card definition
export type Stat = {
  id: StatId;
  title: string;
  apiKey: CoinId;
};