export type WorkOrderStatus = "submitted" | "acknowledged" | "in_progress" | "resolved" | "closed";
export type WorkOrderPriority = "low" | "medium" | "high" | "emergency";
export type WorkOrderCategory = "plumbing" | "electrical" | "heating" | "appliance" | "structural" | "pest" | "exterior" | "other";

export interface WorkOrder {
  id: string;
  caseNumber: string;
  propertyId: string;
  tenantId: string;
  landlordId: string;
  category: WorkOrderCategory;
  priority: WorkOrderPriority;
  title: string;
  description: string;
  status: WorkOrderStatus;
  createdAt: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
  closedAt?: string;
  photos: string[];
  resolutionPhotos: string[];
  resolutionNotes?: string;
  fromChecklist?: boolean;
  publiclyVisible: boolean;
}

let caseCounter = 1001;
export const generateCaseNumber = (): string => {
  const num = caseCounter++;
  return `WO-2026-${String(num).padStart(4, "0")}`;
};

export const getResponseTimeHours = (order: WorkOrder): number | null => {
  if (!order.acknowledgedAt) return null;
  return Math.round(
    (new Date(order.acknowledgedAt).getTime() - new Date(order.createdAt).getTime()) / 3600000
  );
};

export const getAvgResponseTime = (orders: WorkOrder[]): number | null => {
  const times = orders.map(getResponseTimeHours).filter((t): t is number => t !== null);
  if (times.length === 0) return null;
  return Math.round(times.reduce((a, b) => a + b, 0) / times.length);
};

export const statusLabels: Record<WorkOrderStatus, string> = {
  submitted: "Submitted",
  acknowledged: "Acknowledged",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
};

export const priorityLabels: Record<WorkOrderPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  emergency: "Emergency",
};

export const categoryLabels: Record<WorkOrderCategory, string> = {
  plumbing: "Plumbing",
  electrical: "Electrical",
  heating: "Heating / HVAC",
  appliance: "Appliance",
  structural: "Structural",
  pest: "Pest Control",
  exterior: "Exterior / Grounds",
  other: "Other",
};

export const workOrders: WorkOrder[] = [
  {
    id: "wo1",
    caseNumber: "WO-2026-0001",
    propertyId: "p1",
    tenantId: "u1",
    landlordId: "l1",
    category: "plumbing",
    priority: "high",
    title: "Kitchen faucet leaking constantly",
    description: "The kitchen faucet has been dripping non-stop for two days. Water pooling under the sink.",
    status: "resolved",
    createdAt: "2026-01-10T09:00:00",
    acknowledgedAt: "2026-01-10T14:30:00",
    resolvedAt: "2026-01-12T11:00:00",
    photos: [],
    resolutionPhotos: [],
    resolutionNotes: "Replaced faucet cartridge and tightened connections.",
    publiclyVisible: true,
  },
  {
    id: "wo2",
    caseNumber: "WO-2026-0002",
    propertyId: "p1",
    tenantId: "u1",
    landlordId: "l1",
    category: "heating",
    priority: "emergency",
    title: "No heat — temperature dropping",
    description: "Furnace stopped working this morning. Indoor temp is 12°C and falling.",
    status: "in_progress",
    createdAt: "2026-02-08T07:15:00",
    acknowledgedAt: "2026-02-08T07:45:00",
    photos: [],
    resolutionPhotos: [],
    publiclyVisible: false,
  },
  {
    id: "wo3",
    caseNumber: "WO-2026-0003",
    propertyId: "p4",
    tenantId: "u3",
    landlordId: "l3",
    category: "plumbing",
    priority: "medium",
    title: "Bathroom faucet dripping",
    description: "Slow drip from bathroom sink faucet. Reported three months ago with no response.",
    status: "submitted",
    createdAt: "2025-11-01T10:00:00",
    photos: [],
    resolutionPhotos: [],
    publiclyVisible: false,
  },
];
