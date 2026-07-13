import { DashboardHeader } from "@/components/dashboard-header";
import { NodeStatusCard } from "@/components/node-status-card";
import { AlertsFeed } from "@/components/alerts-feed";
import { mockNodes } from "@/lib/mock-data";
import { getAlerts } from "@/lib/store";
import { Video, Shield } from "lucide-react";

export default function DashboardPage() {
  const onlineCount = mockNodes.filter((n) => n.status === "online").length;
  const totalCameras = mockNodes.reduce((sum, n) => sum + n.came…(truncated)