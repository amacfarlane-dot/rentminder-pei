import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, Property } from '@/lib/supabase';

// Add this inside your Index component:
const [properties, setProperties] = useState<Property[]>([]);
const [searchTerm, setSearchTerm] = useState('');

useEffect(() => {
  fetchProperties();
}, []);

async function fetchProperties() {
  const { data } = await supabase.from('properties').select('*').limit(10);
  setProperties(data || []);
}

const filteredProperties = properties.filter(p => 
  p.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
  p.city.toLowerCase().includes(searchTerm.toLowerCase())
);
