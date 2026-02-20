import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import StarRating from "@/components/shared/StarRating";
import { properties, landlords, reviews } from "@/data/mockData";
import { getPropertyDetails, standardAmenities } from "@/data/property-details";
import { peiSchoolZones } from "@/data/school-zones";
import { renovations, getIRACAnalysis } from "@/data/renovations";
import { workOrders, getAvgResponseTime, statusLabels } from "@/data/work-orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Bed,
  Bath,
  MapPin,
  DollarSign,
  TrendingUp,
  User,
  ThumbsUp,
  Calendar,
  ArrowLeft,
  PenLine,
  GraduationCap,
  Wrench,
  Hammer,
} from "lucide-react";
import { motion } from "framer-motion";

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Home, BedDouble, Zap, Flame, Wifi, Car } from 'lucide-react';
import { supabase, Property, RentHistory, Landlord } from '@/lib/supabase';
import { RentChart } from '@/components/RentChart';
import { Badge } from '@/components/ui/badge';

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [rentHistory, setRentHistory] = useState<RentHistory[]>([]);
  const [landlord, setLandlord] = useState<Landlord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPropertyData();
  }, [id]);

  async function fetchPropertyData() {
    try {
      const { data: propData } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
      
      setProperty(propData);

      const { data: historyData } = await supabase
        .from('rent_history')
        .select('*')
        .eq('property_id', id)
        .order('date', { ascending: false });
      
      setRentHistory(historyData || []);

      if (propData?.landlord_id) {
        const { data: landlordData } = await supabase
          .from('landlords')
          .select('*')
          .eq('id', propData.landlord_id)
          .single();
        
        setLandlord(landlordData);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (!property) return <div className="text-center py-12">Property not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft size={18} className="mr-1" /> Back
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <MapPin size={18} />
                  <span>{property.city}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {property.address}
                  {property.unit_number && <span className="text-gray-500">, Unit {property.unit_number}</span>}
                </h1>
                <div className="flex gap-2 mt-3">
                  <Badge>{property.property_type}</Badge>
                  <Badge>{property.bedrooms} Beds</Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-red-600">${property.current_rent}</p>
                <p className="text-gray-500">per month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Rent History</h2>
            <RentChart data={rentHistory} />
          </div>
        </div>

        <div className="space-y-6">
          {landlord && (
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Landlord</h3>
              <p className="text-gray-600 mb-2">{landlord.name}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${landlord.aggression_score > 50 ? 'bg-red-500' : landlord.aggression_score > 20 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${landlord.aggression_score}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Score: {landlord.aggression_score}/100</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
