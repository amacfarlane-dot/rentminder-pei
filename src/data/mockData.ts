export interface Property {
  id: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  type: "apartment" | "house" | "condo" | "duplex" | "townhouse";
  bedrooms: number;
  bathrooms: number;
  currentRent: number;
  landlordId: string;
  averageRating: number;
  reviewCount: number;
  rentHistory: { date: string; rent: number }[];
  image: string;
}

export interface Landlord {
  id: string;
  name: string;
  company?: string;
  propertyIds: string[];
  averageRating: number;
  totalReviews: number;
  responseRate: number;
  verified: boolean;
}

export interface Review {
  id: string;
  propertyId: string;
  landlordId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  helpfulVotes: number;
  categories: {
    maintenance: number;
    communication: number;
    value: number;
    safety: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "tenant" | "landlord" | "admin";
  points: number;
  level: string;
  badges: string[];
  reviewCount: number;
  joinDate: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  readTime: number;
}

export const properties: Property[] = [
  {
    id: "p1",
    address: "42 University Ave",
    city: "Charlottetown",
    province: "PE",
    postalCode: "C1A 4L4",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    currentRent: 1250,
    landlordId: "l1",
    averageRating: 4.2,
    reviewCount: 8,
    rentHistory: [
      { date: "2024-01", rent: 1100 },
      { date: "2024-06", rent: 1150 },
      { date: "2025-01", rent: 1200 },
      { date: "2025-07", rent: 1250 },
    ],
    image: "",
  },
  {
    id: "p2",
    address: "15 Queen St",
    city: "Charlottetown",
    province: "PE",
    postalCode: "C1A 4A8",
    type: "house",
    bedrooms: 3,
    bathrooms: 2,
    currentRent: 1800,
    landlordId: "l1",
    averageRating: 3.8,
    reviewCount: 12,
    rentHistory: [
      { date: "2023-06", rent: 1500 },
      { date: "2024-01", rent: 1600 },
      { date: "2024-07", rent: 1700 },
      { date: "2025-01", rent: 1800 },
    ],
    image: "",
  },
  {
    id: "p3",
    address: "88 Water St",
    city: "Summerside",
    province: "PE",
    postalCode: "C1N 1B3",
    type: "condo",
    bedrooms: 1,
    bathrooms: 1,
    currentRent: 950,
    landlordId: "l2",
    averageRating: 4.6,
    reviewCount: 5,
    rentHistory: [
      { date: "2024-03", rent: 850 },
      { date: "2024-09", rent: 900 },
      { date: "2025-03", rent: 950 },
    ],
    image: "",
  },
  {
    id: "p4",
    address: "220 Kent St",
    city: "Charlottetown",
    province: "PE",
    postalCode: "C1A 1P2",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    currentRent: 1400,
    landlordId: "l3",
    averageRating: 2.9,
    reviewCount: 15,
    rentHistory: [
      { date: "2023-09", rent: 1100 },
      { date: "2024-03", rent: 1200 },
      { date: "2024-09", rent: 1350 },
      { date: "2025-03", rent: 1400 },
    ],
    image: "",
  },
  {
    id: "p5",
    address: "5 Harbour Dr",
    city: "Stratford",
    province: "PE",
    postalCode: "C1B 1T4",
    type: "townhouse",
    bedrooms: 3,
    bathrooms: 2,
    currentRent: 1650,
    landlordId: "l2",
    averageRating: 4.4,
    reviewCount: 7,
    rentHistory: [
      { date: "2024-01", rent: 1450 },
      { date: "2024-07", rent: 1550 },
      { date: "2025-01", rent: 1650 },
    ],
    image: "",
  },
  {
    id: "p6",
    address: "31 Brackley Point Rd",
    city: "Charlottetown",
    province: "PE",
    postalCode: "C1A 6R3",
    type: "duplex",
    bedrooms: 2,
    bathrooms: 1,
    currentRent: 1100,
    landlordId: "l4",
    averageRating: 3.5,
    reviewCount: 4,
    rentHistory: [
      { date: "2024-06", rent: 1000 },
      { date: "2025-01", rent: 1050 },
      { date: "2025-06", rent: 1100 },
    ],
    image: "",
  },
];

export const landlords: Landlord[] = [
  {
    id: "l1",
    name: "James MacPherson",
    company: "MacPherson Properties Ltd.",
    propertyIds: ["p1", "p2"],
    averageRating: 4.0,
    totalReviews: 20,
    responseRate: 85,
    verified: true,
  },
  {
    id: "l2",
    name: "Sarah Chen",
    company: "Island Living Rentals",
    propertyIds: ["p3", "p5"],
    averageRating: 4.5,
    totalReviews: 12,
    responseRate: 95,
    verified: true,
  },
  {
    id: "l3",
    name: "Robert Campbell",
    propertyIds: ["p4"],
    averageRating: 2.9,
    totalReviews: 15,
    responseRate: 40,
    verified: false,
  },
  {
    id: "l4",
    name: "Anne Murray",
    company: "Murray Homes",
    propertyIds: ["p6"],
    averageRating: 3.5,
    totalReviews: 4,
    responseRate: 70,
    verified: false,
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    propertyId: "p1",
    landlordId: "l1",
    userId: "u1",
    userName: "Michael T.",
    rating: 5,
    title: "Great apartment, responsive landlord",
    text: "Lived here for two years and James was always quick to fix things. The apartment is well-maintained, clean, and in a great location near UPEI. Heat is included which is a huge plus during PEI winters. Would highly recommend to students or young professionals looking for affordable housing in Charlottetown.",
    date: "2025-11-15",
    helpfulVotes: 12,
    categories: { maintenance: 5, communication: 5, value: 4, safety: 5 },
  },
  {
    id: "r2",
    propertyId: "p1",
    landlordId: "l1",
    userId: "u2",
    userName: "Lisa M.",
    rating: 4,
    title: "Solid choice for downtown living",
    text: "The location is unbeatable and James is a fair landlord. Only dock a star because the building is older and could use some cosmetic updates. The rent increases have been reasonable and within the PEI guidelines. Laundry in the building is a nice perk. Parking can be tricky during winter months though.",
    date: "2025-08-22",
    helpfulVotes: 8,
    categories: { maintenance: 3, communication: 4, value: 4, safety: 4 },
  },
  {
    id: "r3",
    propertyId: "p4",
    landlordId: "l3",
    userId: "u3",
    userName: "David K.",
    rating: 2,
    title: "Slow repairs, questionable rent increase",
    text: "Had a leaking faucet for three months before it was fixed. The rent went up 12% which I believe exceeds the allowable increase under PEI regulations. When I asked about it, the landlord was dismissive. I ended up filing a complaint with IRAC. The apartment itself is okay but the management is poor.",
    date: "2025-10-03",
    helpfulVotes: 24,
    categories: { maintenance: 1, communication: 2, value: 2, safety: 3 },
  },
  {
    id: "r4",
    propertyId: "p3",
    landlordId: "l2",
    userId: "u4",
    userName: "Emily R.",
    rating: 5,
    title: "Best landlord in Summerside",
    text: "Sarah is an amazing landlord. She responds to maintenance requests within hours, the condo is beautifully maintained, and she even brought us fresh lobster during the summer! The waterfront location in Summerside is peaceful and perfect. Rent is very fair for what you get. Could not ask for a better rental experience.",
    date: "2025-12-01",
    helpfulVotes: 18,
    categories: { maintenance: 5, communication: 5, value: 5, safety: 5 },
  },
  {
    id: "r5",
    propertyId: "p2",
    landlordId: "l1",
    userId: "u5",
    userName: "Tom H.",
    rating: 3,
    title: "Decent house but needs updates",
    text: "The house on Queen St is spacious enough for a family but showing its age. James is responsive but the house needs some significant updates — the furnace is old and the windows are drafty. Rent increases have been within the legal limit which I appreciate. Good neighbourhood though and close to schools.",
    date: "2025-09-14",
    helpfulVotes: 6,
    categories: { maintenance: 3, communication: 4, value: 3, safety: 3 },
  },
];

export const currentUser: User = {
  id: "u1",
  name: "Michael Turner",
  email: "michael@example.com",
  role: "tenant",
  points: 750,
  level: "Contributor",
  badges: ["First Review", "Helpful Voter", "Rent Tracker", "PEI Pioneer"],
  reviewCount: 5,
  joinDate: "2025-03-15",
};

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "Understanding PEI's 2026 Rent Increase Cap of 2.0%",
    excerpt: "Everything you need to know about the allowable rent increase for 2026 and how it affects your tenancy.",
    content: "",
    date: "2026-01-15",
    author: "RentMinder Team",
    category: "Rent Control",
    readTime: 5,
  },
  {
    id: "b2",
    title: "How to File a Dispute with IRAC",
    excerpt: "Step-by-step guide to filing a rental dispute with the Island Regulatory and Appeals Commission.",
    content: "",
    date: "2026-01-08",
    author: "Legal Team",
    category: "Disputes",
    readTime: 8,
  },
  {
    id: "b3",
    title: "Tenant Rights in PEI: A Complete Guide",
    excerpt: "Know your rights under the PEI Residential Tenancy Act. From security deposits to eviction procedures.",
    content: "",
    date: "2025-12-20",
    author: "RentMinder Team",
    category: "Tenant Rights",
    readTime: 12,
  },
  {
    id: "b4",
    title: "Top 5 Neighborhoods in Charlottetown for Renters",
    excerpt: "Discover the best areas to rent in PEI's capital based on price, amenities, and tenant reviews.",
    content: "",
    date: "2025-12-10",
    author: "Community",
    category: "Guides",
    readTime: 6,
  },
  {
    id: "b5",
    title: "Security Deposit Rules in PEI",
    excerpt: "What landlords can and cannot do with your security deposit under PEI law.",
    content: "",
    date: "2025-11-28",
    author: "Legal Team",
    category: "Tenant Rights",
    readTime: 4,
  },
  {
    id: "b6",
    title: "Preparing for Winter: Tenant Heating Rights",
    excerpt: "Your landlord's obligations regarding heating during PEI's cold winter months.",
    content: "",
    date: "2025-11-15",
    author: "RentMinder Team",
    category: "Guides",
    readTime: 5,
  },
];

export const levels = [
  { name: "Newcomer", minPoints: 0, icon: "🌱" },
  { name: "Contributor", minPoints: 500, icon: "✍️" },
  { name: "Trusted Source", minPoints: 1500, icon: "⭐" },
  { name: "Community Expert", minPoints: 3000, icon: "🏆" },
  { name: "RentMinder Legend", minPoints: 5000, icon: "👑" },
];

export const provinces = [
  { code: "AB", name: "Alberta", active: false },
  { code: "BC", name: "British Columbia", active: false },
  { code: "MB", name: "Manitoba", active: false },
  { code: "NB", name: "New Brunswick", active: false },
  { code: "NL", name: "Newfoundland and Labrador", active: false },
  { code: "NS", name: "Nova Scotia", active: false },
  { code: "NT", name: "Northwest Territories", active: false },
  { code: "NU", name: "Nunavut", active: false },
  { code: "ON", name: "Ontario", active: false },
  { code: "PE", name: "Prince Edward Island", active: true },
  { code: "QC", name: "Quebec", active: false },
  { code: "SK", name: "Saskatchewan", active: false },
  { code: "YT", name: "Yukon", active: false },
];
