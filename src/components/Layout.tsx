export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen bg-neutral-900 text-white grid grid-rows-[60px_1fr]">
      <header className="border-b border-neutral-800 px-6 flex items-center justify-between">
        <div className="font-semibold text-lg">Crypto Dashboard</div>
        <button className="bg-neutral-800 hover:bg-neutral-700 px-4 py-1 rounded text-sm">
          Connect Wallet
        </button>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
