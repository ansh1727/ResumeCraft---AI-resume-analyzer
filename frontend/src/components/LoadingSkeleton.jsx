const LoadingSkeleton = ({ fullPage = false, rows = 3 }) => {
  if (fullPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="rounded-xl bg-gray-200 p-6 dark:bg-gray-800">
          <div className="mb-3 h-4 w-1/3 rounded bg-gray-300 dark:bg-gray-700" />
          <div className="h-3 w-2/3 rounded bg-gray-300 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
