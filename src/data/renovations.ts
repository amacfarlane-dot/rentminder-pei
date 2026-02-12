export interface Renovation {
  id: string;
  propertyId: string;
  landlordId: string;
  title: string;
  description: string;
  cost: number;
  iracEligible: boolean;
  completedDate: string;
  contractor?: string;
  beforePhotos: string[];
  afterPhotos: string[];
  category: RenovationCategory;
}

export type RenovationCategory =
  | "kitchen"
  | "bathroom"
  | "flooring"
  | "windows"
  | "roof"
  | "heating"
  | "electrical"
  | "plumbing"
  | "exterior"
  | "accessibility"
  | "other";

export const renovationCategoryLabels: Record<RenovationCategory, string> = {
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  flooring: "Flooring",
  windows: "Windows / Doors",
  roof: "Roof",
  heating: "Heating / HVAC",
  electrical: "Electrical",
  plumbing: "Plumbing",
  exterior: "Exterior / Siding",
  accessibility: "Accessibility",
  other: "Other",
};

export interface IRACAnalysis {
  totalSpent: number;
  eligibleSpent: number;
  threshold: number;
  percentOfThreshold: number;
  lookbackMonths: number;
  eligibleItems: Renovation[];
}

/**
 * Calculates IRAC-eligible capital improvement spending.
 * PEI landlords may apply for above-guideline rent increases if
 * capital expenditures exceed a per-unit threshold.
 */
export const getIRACAnalysis = (
  renovations: Renovation[],
  lookbackMonths = 36,
  threshold = 10000
): IRACAnalysis => {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - lookbackMonths);

  const eligible = renovations.filter(
    (r) => r.iracEligible && new Date(r.completedDate) >= cutoff
  );
  const eligibleSpent = eligible.reduce((sum, r) => sum + r.cost, 0);
  const totalSpent = renovations
    .filter((r) => new Date(r.completedDate) >= cutoff)
    .reduce((sum, r) => sum + r.cost, 0);

  return {
    totalSpent,
    eligibleSpent,
    threshold,
    percentOfThreshold: Math.min((eligibleSpent / threshold) * 100, 100),
    lookbackMonths,
    eligibleItems: eligible,
  };
};

export const renovations: Renovation[] = [
  {
    id: "ren1",
    propertyId: "p1",
    landlordId: "l1",
    title: "Kitchen countertop replacement",
    description: "Replaced laminate countertops with granite. New backsplash installed.",
    cost: 3200,
    iracEligible: true,
    completedDate: "2025-06-15",
    contractor: "Island Granite Co.",
    beforePhotos: [],
    afterPhotos: [],
    category: "kitchen",
  },
  {
    id: "ren2",
    propertyId: "p1",
    landlordId: "l1",
    title: "New energy-efficient windows",
    description: "All 6 windows replaced with triple-pane energy efficient models.",
    cost: 5800,
    iracEligible: true,
    completedDate: "2025-09-20",
    contractor: "PEI Window & Door",
    beforePhotos: [],
    afterPhotos: [],
    category: "windows",
  },
  {
    id: "ren3",
    propertyId: "p3",
    landlordId: "l2",
    title: "Bathroom renovation",
    description: "Complete bathroom gut and remodel with walk-in shower and new vanity.",
    cost: 8500,
    iracEligible: true,
    completedDate: "2025-03-10",
    contractor: "Maritime Renovations",
    beforePhotos: [],
    afterPhotos: [],
    category: "bathroom",
  },
  {
    id: "ren4",
    propertyId: "p2",
    landlordId: "l1",
    title: "Interior paint refresh",
    description: "Full interior repaint — all rooms and hallways.",
    cost: 1200,
    iracEligible: false,
    completedDate: "2025-08-01",
    beforePhotos: [],
    afterPhotos: [],
    category: "other",
  },
];
