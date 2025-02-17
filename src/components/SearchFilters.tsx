'use client'

import { useEffect, useState } from "react";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilter: (filter: { location?: string; category?: string }) => void;
  currentFilters: {
    q: string;
    location: string;
    category: string;
  };
}

export function SearchFilters({ onSearch, onFilter, currentFilters }: SearchFiltersProps) {
  const [locations, setLocations] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchCategories = async () => {
    const res = await fetch(`/api/destinasi/categories`);
    const data = await res.json();
    setCategories(data);
  };

  const fetchLocations = async () => {
    const res = await fetch(`/api/destinasi/location`);
    const data = await res.json();
    setLocations(data);
  };

  useEffect(() => {
    fetchCategories();
    fetchLocations();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Cari destinasi..."
          className="p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={currentFilters.q}
          onChange={(e) => onSearch(e.target.value)}
        />
        <select
          className="p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={currentFilters.location}
          onChange={(e) => onFilter({ location: e.target.value })}
        >
          <option value="">Semua Lokasi</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <select
          className="p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={currentFilters.category}
          onChange={(e) => onFilter({ category: e.target.value })}
        >
          <option value="">Semua Kategori</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}