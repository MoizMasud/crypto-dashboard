export type CoinKey = 'bitcoin' | 'ethereum' | 'solana';

export type CoinInfo = {
  usd: number;
  usd_24h_change: number;
};

// The full market data object
export type MarketData = Record<CoinKey, CoinInfo>;

// IDs you use in your UI
export type StatId = 'btc' | 'eth' | 'sol';

// One stat card definition
export type Stat = {
  id: StatId;
  title: string;
  apiKey: CoinKey;
};