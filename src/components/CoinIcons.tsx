// src/coinIcons.tsx
import { SiBitcoin, SiEthereum, SiSolana } from 'react-icons/si';
import type { StatId } from '../types';
import type { JSX } from 'react';

export const coinIcons: Record<StatId, JSX.Element> = {
  btc: <SiBitcoin className="w-6 h-6 text-orange-400" />,
  eth: <SiEthereum className="w-6 h-6 text-indigo-400" />,
  sol: <SiSolana className="w-6 h-6 text-emerald-400" />,
};
