import { Skeleton } from "@/components/ui/skeleton";

export const DashboardTaskSkeleton = () => (
  <div className="space-y-2">
    {[...Array(5)].map((_, index) => (
      <Skeleton key={index} className="h-10 w-full" />
    ))}
  </div>
);

export const DashboardTopRankSkeleton = () => (
  <div className="space-y-4">
    {[...Array(15)].map((_, index) => (
      <div key={index} className="flex items-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    ))}
  </div>
);
