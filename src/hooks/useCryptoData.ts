import { useEffect, useState } from "react";
type CoinData = {
  usd: number;
  usd_24h_change: number;
};

type MarketData = {
  bitcoin: CoinData;
  ethereum: CoinData;
  solana: CoinData;
};

export function useCryptoData() {
  const [data, setData] = useState<MarketData>();
  const [loading, setLoading] = useState(true);

useEffect(() => { // ngOnInit
    load();
}, []);


async function load() {
    try {
        const res = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true"
        );
        const json = await res.json();
        setData(json);
    } finally {
        setLoading(false);
    }
}



  return { data, loading };
}
