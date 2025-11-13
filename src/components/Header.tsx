// src/components/Header.tsx
type HeaderProps = {
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  onRefresh: () => void;
};

export function Header({ isLoading, error, lastUpdated, onRefresh }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
      <div>
        <h1 className="text-xl font-semibold">Crypto Dashboard</h1>
        {lastUpdated && (
          <p className="text-xs text-gray-400">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
        {error && (
          <p className="text-xs text-red-400 mt-1">
            Error: {error}
          </p>
        )}
      </div>

      <button
        onClick={onRefresh}
        className="px-3 py-1 rounded-md border border-gray-600 text-sm bg-gray-900 hover:bg-gray-800 disabled:opacity-60"
        disabled={isLoading}
      >
        {isLoading ? 'Refreshing…' : 'Refresh'}
      </button>
    </header>
  );
}
