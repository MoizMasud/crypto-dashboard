export function StatsCardSkeleton() {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-md animate-pulse">
      <div className="h-4 w-24 bg-gray-700 rounded mb-3" />
      <div className="h-6 w-32 bg-gray-700 rounded mb-2" />
      <div className="h-4 w-16 bg-gray-700 rounded" />
    </div>
  );
}