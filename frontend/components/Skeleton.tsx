import clsx from 'clsx';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-800',
        className,
      )}
    />
  );
}

export function SkeletonText({
  lines = 1,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className='space-y-2'>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={clsx(
            'h-4',
            i === lines - 1 ? 'w-2/3' : 'w-full',
            className,
          )}
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className='border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-4'>
      <div className='flex justify-between items-start gap-3'>
        <Skeleton className='h-6 w-1/3' />
        <Skeleton className='h-5 w-20 rounded-full' />
      </div>
      <SkeletonText lines={2} />
      <div className='flex gap-2'>
        <Skeleton className='h-6 w-16 rounded-full' />
        <Skeleton className='h-6 w-20 rounded-full' />
        <Skeleton className='h-6 w-14 rounded-full' />
      </div>
    </div>
  );
}
