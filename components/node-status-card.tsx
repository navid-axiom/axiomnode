"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AxiomNode } from "@/types";
import { Activity, Video } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

export function NodeStatusCard({ node }: { node: AxiomNode }) {
  const isOnline = node.status === "online";

  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium text-slate-200">
            {node.name}
          </CardTitle>
          <p className="mt-0.5 text-xs text-slate-500">{node.location}</p>
        </div>
        <Badge
          className={cn(
            "gap-1.5 border font-medium",
            isOnline
              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
              : "border-red-400/30 bg-red-400/10 text-red-400"
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              isOnline
                ? "bg-emerald-400 shadow-[0_0_6px_1px_rgba(52,211,153,0.8)]"
                : "bg-red-400"
            )}
          />
          {isOnline ? "Online" : "Offline"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Video className="h-3.5 w-3.5" />
            {node.cameraCount} cameras
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5" />
            {isOnline
              ? "Live"
              : `Last seen ${formatDistanceToNow(new Date(node.lastSeen), { addSuffix: true })}`}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
