const Skeleton = ({ className = '', variant = 'rectangular' }) => {
  const base = 'animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]';

  const variants = {
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded h-4 w-3/4',
  };

  return (
    <div
      className={`${base} ${variants[variant]} ${className}`}
      aria-hidden="true"
    />
  );
};

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" className="w-12 h-12" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

/** Skeleton for the analysis result page sections */
export function AnalysisSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header skeleton */}
      <div className="bg-gradient-to-r from-blue-600 to-violet-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Skeleton className="h-4 w-40 !from-white/20 !via-white/10 !to-white/20 mb-3" />
          <Skeleton className="h-8 w-80 !from-white/20 !via-white/10 !to-white/20 mb-2" />
          <Skeleton className="h-4 w-96 !from-white/20 !via-white/10 !to-white/20 mb-4" />
          <div className="flex gap-3">
            <Skeleton className="h-6 w-28 rounded-full !from-white/20 !via-white/10 !to-white/20" />
            <Skeleton className="h-6 w-20 rounded-full !from-white/20 !via-white/10 !to-white/20" />
          </div>
        </div>
      </div>
      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Section heading */}
        <div>
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
        <div>
          <Skeleton className="h-6 w-56 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Skeleton for the dashboard page during initialization */
export function DashboardSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-8 w-64 mb-3" />
        <div className="flex gap-3">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-40 mt-1" />
        </div>
        {/* Progress bar skeleton */}
        <div className="mt-6">
          <Skeleton className="h-3 w-full rounded-full" />
        </div>
      </div>
      {/* Tab bar */}
      <div className="flex gap-1 mb-6 border-b border-slate-200">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-10 w-24 rounded-t-lg" />
        ))}
      </div>
      {/* Kanban columns skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((col) => (
          <div key={col} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <Skeleton className="h-5 w-24 mb-2" />
            {[1, 2].map((card) => (
              <div key={card} className="rounded-lg border border-slate-200 bg-white p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-14 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Stat skeleton for StatsBar */
export function StatSkeleton() {
  return (
    <div className="text-center space-y-3">
      <Skeleton variant="circular" className="w-8 h-8 mx-auto" />
      <Skeleton className="h-8 w-24 mx-auto" />
      <Skeleton className="h-3 w-32 mx-auto" />
    </div>
  );
}

export default Skeleton;
