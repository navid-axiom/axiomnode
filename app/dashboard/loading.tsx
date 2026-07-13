import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#05070a] p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <Skeleton className="h-8 w-64 bg-slate-800" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-28 bg-slate-800" />
          <Skeleton className="h-28 bg-slate-800" />
          <Skeleton className="h-28 bg-slate-800" />
        </div>
        <Skeleton className="h-64 bg-slate-800" />
      </div>
    </div>
  );
}
