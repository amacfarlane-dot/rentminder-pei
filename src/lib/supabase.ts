import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zsavrszmltjqweurskap.supabase.co';
const supabaseKey = 'sb_publishable_mqsgKm7pnUAc1tNHxV8cWQ_IC0P6CqV';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Property = {
  id: number;
  address: string;
  unit_number: string | null;
  city: string;
  property_type: string;
  bedrooms: number;
  current_rent: number;
  landlord_id: number;
  electricity_included: string | null;
  heat_included: string | null;
  internet_included: string | null;
  parking_included: string | null;
};

export type RentHistory = {
  id: number;
  property_id: number;
  date: string;
  rent_amount: number;
  increase_percentage: number;
  irac_guideline: number;
  is_exemption: boolean;
};

export type Landlord = {
  id: number;
  name: string;
  total_properties: number;
  aggression_score: number;
  exemption_applications: number;
};
