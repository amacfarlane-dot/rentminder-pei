// Standardised amenity keys with Lucide icon names for consistent rendering
export interface Amenity {
  key: string;
  label: string;
  icon: string; // Lucide icon name (kebab-case)
}

export const standardAmenities: Amenity[] = [
  { key: "laundry_in_unit", label: "In-Unit Laundry", icon: "washing-machine" },
  { key: "laundry_in_building", label: "Laundry in Building", icon: "shirt" },
  { key: "dishwasher", label: "Dishwasher", icon: "utensils-crossed" },
  { key: "air_conditioning", label: "Air Conditioning", icon: "snowflake" },
  { key: "parking_included", label: "Parking Included", icon: "car" },
  { key: "storage", label: "Storage Unit", icon: "warehouse" },
  { key: "balcony", label: "Balcony / Patio", icon: "fence" },
  { key: "pet_friendly", label: "Pet Friendly", icon: "paw-print" },
  { key: "wheelchair_accessible", label: "Wheelchair Accessible", icon: "accessibility" },
  { key: "gym", label: "Fitness Room", icon: "dumbbell" },
  { key: "elevator", label: "Elevator", icon: "arrow-up-down" },
  { key: "heat_included", label: "Heat Included", icon: "flame" },
  { key: "water_included", label: "Water Included", icon: "droplets" },
  { key: "internet_included", label: "Internet Included", icon: "wifi" },
  { key: "security_cameras", label: "Security Cameras", icon: "cctv" },
  { key: "intercom", label: "Intercom / Buzzer", icon: "phone-call" },
  { key: "smoke_free", label: "Smoke-Free Building", icon: "cigarette-off" },
  { key: "yard", label: "Private Yard", icon: "trees" },
];

export interface NearbyPlace {
  type: "grocery" | "pharmacy" | "gas_station" | "hospital" | "transit" | "restaurant" | "park";
  name: string;
  distanceKm: number;
}

export const nearbyPlaceIcons: Record<NearbyPlace["type"], string> = {
  grocery: "shopping-cart",
  pharmacy: "pill",
  gas_station: "fuel",
  hospital: "hospital",
  transit: "bus",
  restaurant: "utensils",
  park: "tree-pine",
};

export interface PropertyDetails {
  propertyId: string;
  amenities: string[]; // keys from standardAmenities
  schoolZoneIds: string[];
  nearbyPlaces: NearbyPlace[];
}

export const propertyDetails: PropertyDetails[] = [
  {
    propertyId: "p1",
    amenities: ["laundry_in_building", "heat_included", "parking_included", "smoke_free", "intercom"],
    schoolZoneIds: ["sz1", "sz5", "sz7"],
    nearbyPlaces: [
      { type: "grocery", name: "Sobeys", distanceKm: 0.8 },
      { type: "pharmacy", name: "Shoppers Drug Mart", distanceKm: 0.5 },
      { type: "transit", name: "T3 Transit Stop", distanceKm: 0.2 },
      { type: "park", name: "Victoria Park", distanceKm: 1.2 },
      { type: "restaurant", name: "Receiver Coffee", distanceKm: 0.3 },
    ],
  },
  {
    propertyId: "p2",
    amenities: ["laundry_in_unit", "yard", "parking_included", "pet_friendly", "storage"],
    schoolZoneIds: ["sz4", "sz5", "sz8"],
    nearbyPlaces: [
      { type: "grocery", name: "Atlantic Superstore", distanceKm: 1.5 },
      { type: "gas_station", name: "Irving", distanceKm: 0.6 },
      { type: "hospital", name: "Queen Elizabeth Hospital", distanceKm: 2.0 },
      { type: "park", name: "Confederation Landing", distanceKm: 0.8 },
    ],
  },
  {
    propertyId: "p3",
    amenities: ["laundry_in_unit", "dishwasher", "air_conditioning", "balcony", "elevator", "parking_included"],
    schoolZoneIds: ["sz11", "sz12", "sz13"],
    nearbyPlaces: [
      { type: "grocery", name: "Co-op", distanceKm: 0.4 },
      { type: "pharmacy", name: "Lawtons", distanceKm: 0.3 },
      { type: "restaurant", name: "OpenEats Summerside", distanceKm: 0.5 },
      { type: "park", name: "Green's Shore", distanceKm: 0.6 },
    ],
  },
  {
    propertyId: "p4",
    amenities: ["laundry_in_building", "smoke_free"],
    schoolZoneIds: ["sz3", "sz6", "sz7"],
    nearbyPlaces: [
      { type: "grocery", name: "Walmart Supercentre", distanceKm: 1.8 },
      { type: "gas_station", name: "Petro-Canada", distanceKm: 1.0 },
      { type: "transit", name: "T3 Transit Stop", distanceKm: 0.4 },
    ],
  },
  {
    propertyId: "p5",
    amenities: ["laundry_in_unit", "parking_included", "pet_friendly", "yard", "storage"],
    schoolZoneIds: ["sz9", "sz10"],
    nearbyPlaces: [
      { type: "grocery", name: "Sobeys", distanceKm: 1.2 },
      { type: "pharmacy", name: "Shoppers Drug Mart", distanceKm: 1.0 },
      { type: "gas_station", name: "Shell", distanceKm: 0.5 },
      { type: "park", name: "Tea Hill Park", distanceKm: 0.8 },
    ],
  },
  {
    propertyId: "p6",
    amenities: ["laundry_in_building", "parking_included", "smoke_free", "heat_included"],
    schoolZoneIds: ["sz2", "sz6", "sz8"],
    nearbyPlaces: [
      { type: "grocery", name: "Atlantic Superstore", distanceKm: 0.7 },
      { type: "pharmacy", name: "Lawtons", distanceKm: 0.9 },
      { type: "transit", name: "T3 Transit Stop", distanceKm: 0.3 },
    ],
  },
];

export const getPropertyDetails = (propertyId: string): PropertyDetails | undefined =>
  propertyDetails.find((pd) => pd.propertyId === propertyId);

export const getAmenityByKey = (key: string): Amenity | undefined =>
  standardAmenities.find((a) => a.key === key);
