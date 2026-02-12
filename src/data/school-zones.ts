export interface SchoolZone {
  id: string;
  name: string;
  type: "elementary" | "intermediate" | "senior_high" | "k-9" | "k-12";
  board: "English" | "French";
  city: string;
  address: string;
  grades: string;
}

export const peiSchoolZones: SchoolZone[] = [
  // English — Charlottetown area
  { id: "sz1", name: "Spring Park Elementary", type: "elementary", board: "English", city: "Charlottetown", address: "30 Kirkdale Rd", grades: "K–6" },
  { id: "sz2", name: "West Royalty Elementary", type: "elementary", board: "English", city: "Charlottetown", address: "1 Greenfield Ave", grades: "K–6" },
  { id: "sz3", name: "Sherwood Elementary", type: "elementary", board: "English", city: "Charlottetown", address: "45 College Ave", grades: "K–6" },
  { id: "sz4", name: "Parkdale Elementary", type: "elementary", board: "English", city: "Charlottetown", address: "50 Parkdale Ave", grades: "K–6" },
  { id: "sz5", name: "Queen Charlotte Intermediate", type: "intermediate", board: "English", city: "Charlottetown", address: "30 Pond St", grades: "7–9" },
  { id: "sz6", name: "Birchwood Intermediate", type: "intermediate", board: "English", city: "Charlottetown", address: "125 Spring Park Rd", grades: "7–9" },
  { id: "sz7", name: "Colonel Gray High School", type: "senior_high", board: "English", city: "Charlottetown", address: "175 Spring Park Rd", grades: "10–12" },
  { id: "sz8", name: "Charlottetown Rural High School", type: "senior_high", board: "English", city: "Charlottetown", address: "50 Hillstrom Ave", grades: "10–12" },
  // Stratford
  { id: "sz9", name: "Glen Stewart Elementary", type: "elementary", board: "English", city: "Stratford", address: "40 Glen Stewart Dr", grades: "K–6" },
  { id: "sz10", name: "Stratford Elementary", type: "elementary", board: "English", city: "Stratford", address: "45 Bunbury Rd", grades: "K–6" },
  // Summerside
  { id: "sz11", name: "Elm Street Elementary", type: "elementary", board: "English", city: "Summerside", address: "49 Elm St", grades: "K–6" },
  { id: "sz12", name: "Summerside Intermediate", type: "intermediate", board: "English", city: "Summerside", address: "450 Granville St", grades: "7–9" },
  { id: "sz13", name: "Three Oaks Senior High", type: "senior_high", board: "English", city: "Summerside", address: "550 Granville St", grades: "10–12" },
  // French
  { id: "sz14", name: "École François-Buote", type: "k-9", board: "French", city: "Charlottetown", address: "30 Longworth Ave", grades: "K–9" },
  { id: "sz15", name: "École-sur-Mer", type: "k-12", board: "French", city: "Summerside", address: "120 Brooke Dr", grades: "K–12" },
  // Rural
  { id: "sz16", name: "Montague Intermediate", type: "intermediate", board: "English", city: "Montague", address: "10 Brook St", grades: "7–9" },
  { id: "sz17", name: "Montague Regional High School", type: "senior_high", board: "English", city: "Montague", address: "25 Chicken Rd", grades: "10–12" },
  { id: "sz18", name: "Westisle Composite High School", type: "senior_high", board: "English", city: "Elmsdale", address: "10351 Rte 2", grades: "10–12" },
  { id: "sz19", name: "Kensington Intermediate-Senior High", type: "k-12", board: "English", city: "Kensington", address: "25 Garden Ave", grades: "7–12" },
  { id: "sz20", name: "Souris Regional School", type: "k-12", board: "English", city: "Souris", address: "15 Longworth St", grades: "K–12" },
];

export const getSchoolsByCity = (city: string) =>
  peiSchoolZones.filter((s) => s.city.toLowerCase() === city.toLowerCase());

export const getSchoolsByType = (type: SchoolZone["type"]) =>
  peiSchoolZones.filter((s) => s.type === type);
