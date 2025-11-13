import type { ReactNode } from 'react';
import { Header } from './Header';

type LayoutProps = {
  children: ReactNode;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  onRefresh: () => void;
};

export function Layout({
  children,
  isLoading,
  error,
  lastUpdated,
  onRefresh,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header
        isLoading={isLoading}
        error={error}
        lastUpdated={lastUpdated}
        onRefresh={onRefresh}
      />
      <main className="p-6">{children}</main>
    </div>
  );
}