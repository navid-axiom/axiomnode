export interface AxiomNode {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline";
  lastSeen: string;
  cameraCount: number;
}

export interface Alert {
  id: string;
  timestamp: string;
  cameraName: string;
  nodeId: string;
  nodeName: string;
  thumbnailUrl: string;
  severity: "human" | "vehicle" | "unknown";
  acknowledged: boolean;
}

export interface AuthUser {
  email: string;
  companyName: string;
}
