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

export const TaskListSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
};

export const TinjauTugasSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-[250px]" />
      <Skeleton className="h-10 w-full" />
      <div className="flex justify-between items-center mt-8">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex space-x-4">
          <Skeleton className="h-10 w-[224px]" />
          <Skeleton className="h-10 w-[160px]" />
        </div>
      </div>
      <div className="mt-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center space-x-4 mt-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RewardListSkeleton = () => {
  return (
    <div className="page-wrapper">
      <div className="flex flex-col justify-between mb-4 mt-14 gap-y-4 lg:mt-0 lg:flex-row lg:mb-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-48" />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>

        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex justify-between items-center">
            <Skeleton className="h-12 w-full" />
          </div>
        ))}

        <div className="flex justify-between items-center mt-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-64" />
        </div>
      </div>
    </div>
  );
};

export const PenukaranRewardSkeleton = () => {
  return (
    <div className="p-8">
      <Skeleton className="h-10 w-64 mb-8" />
      
      <div className="mt-8 flex justify-between">
        <Skeleton className="h-10 w-64" />
        <div className="flex space-x-4">
          <Skeleton className="h-10 w-56" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between mb-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-8 w-1/5" />
          ))}
        </div>

        {[...Array(10)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex justify-between mb-4">
            {[...Array(5)].map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-12 w-1/5" />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-64" />
      </div>
    </div>
  );
};

export const SiswaPageSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col justify-between mb-4 mt-14 gap-y-4 lg:mt-0 lg:flex-row lg:mb-6">
        <Skeleton className="h-10 w-48 sm:w-64" />
        <Skeleton className="h-10 w-40 sm:w-48" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-48" />
        </div>

        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-8 w-24" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PelanggaranSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <Skeleton className="h-10 w-48 mb-4 sm:mb-0" />
        <Skeleton className="h-10 w-full sm:w-64" />
      </div>
      <Skeleton className="h-10 w-full sm:w-48 mb-6" />
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
};

export const PelanggaranFormSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-24" />
  </div>
);