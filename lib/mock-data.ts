import { AxiomNode, Alert } from "@/types";

export const mockNodes: AxiomNode[] = [
  {
    id: "node-001",
    name: "Riverbend RV Storage",
    location: "Gate + Yard, Bay 4",
    status: "online",
    lastSeen: new Date().toISOString(),
    cameraCount: 4,
  },
  {
    id: "node-002",
    name: "Titan Scrap Yard",
    location: "North Fence Line",
    status: "online",
    lastSeen: new Date().toISOString(),
    cameraCount: 6,
  },
  {
    id: "node-003",
    name: "Coastal Mini Storage",
    location: "Front Office",
    status: "offline",
    lastSeen: new Date(Date.now() - 1000 * 60 * 47).toISOString(),
    cameraCount: 2,
  },
];

export const mockAlerts: Alert[] = [
  {
    id: "alert-1",
    timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    cameraName: "Yard Cam 2",
    nodeId: "node-002",
    nodeName: "Titan Scrap Yard",
    thumbnailUrl: "",
    severity: "human",
    acknowledged: false,
  },
  {
    id: "alert-2",
    timestamp: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
    cameraName: "Gate Cam",
    nodeId: "node-001",
    nodeName: "Riverbend RV Storage",
    thumbnailUrl: "",
    severity: "human",
    acknowledged: true,
  },
  {
    id: "alert-3",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    cameraName: "Bay 4 Cam",
    nodeId: "node-001",
    nodeName: "Riverbend RV Storage",
    thumbnailUrl: "",
    severity: "unknown",
    acknowledged: true,
  },
];
