import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted/50',
        className
      )}
    />
  );
};

export const ProductCardSkeleton = ({ className }: SkeletonProps) => {
  return (
    <div className={cn('rounded-lg border bg-card p-4 space-y-4', className)}>
      {/* Image skeleton */}
      <Skeleton className="h-48 w-full rounded-md" />
      
      {/* Badge skeleton */}
      <div className="flex justify-between items-start">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-8 rounded-full" />
      </div>
      
      {/* Title skeleton */}
      <Skeleton className="h-6 w-3/4" />
      
      {/* Price skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-4 w-12" />
      </div>
      
      {/* Rating skeleton */}
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-4 rounded" />
        ))}
        <Skeleton className="h-4 w-16 ml-2" />
      </div>
      
      {/* Buttons skeleton */}
      <div className="flex space-x-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
      </div>
    </div>
  );
};

export const CategoryCardSkeleton = ({ className }: SkeletonProps) => {
  return (
    <div className={cn('rounded-lg border bg-card p-6 text-center space-y-4', className)}>
      <Skeleton className="h-12 w-12 mx-auto rounded-full" />
      <Skeleton className="h-6 w-24 mx-auto" />
      <Skeleton className="h-4 w-16 mx-auto" />
    </div>
  );
};

export const ReviewCardSkeleton = ({ className }: SkeletonProps) => {
  return (
    <div className={cn('rounded-lg border bg-card p-6 space-y-4', className)}>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-4 rounded" />
            ))}
          </div>
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
};

export const HeaderSkeleton = ({ className }: SkeletonProps) => {
  return (
    <div className={cn('border-b bg-background p-4', className)}>
      <div className="container mx-auto flex items-center justify-between">
        <Skeleton className="h-10 w-32" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    </div>
  );
};

interface SkeletonGridProps {
  count?: number;
  component: React.ComponentType<SkeletonProps>;
  className?: string;
}

export const SkeletonGrid = ({ 
  count = 6, 
  component: Component, 
  className 
}: SkeletonGridProps) => {
  return (
    <div className={cn(
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
      className
    )}>
      {[...Array(count)].map((_, i) => (
        <Component key={i} />
      ))}
    </div>
  );
};