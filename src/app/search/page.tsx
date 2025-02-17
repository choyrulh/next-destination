"use client";

import { DestinationCardV2 } from "@/components/DestinationCardV2";
import { SearchFilters } from "@/components/SearchFilters";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



function Page() {
  const [destinations, setDestinations] = useState<any>([]);
  const [searchParams, setSearchParams] = useState({
    q: "",
    location: "",
    category: ""
  });

  useEffect(() => {
    fetchDestinations(searchParams);
  }, [searchParams]);

  const fetchDestinations = async (params: any) => {
    // Remove empty params
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== "")
    );
    
    const query = new URLSearchParams(filteredParams).toString();
    const res = await fetch(`/api/destinasi/filterby${query ? `?${query}` : ''}`);
    const data = await res.json();
    setDestinations(data.data);
  };

  const handleSearch = (query: string) => {
    setSearchParams(prev => ({
      ...prev,
      q: query
    }));
  };

  const handleFilter = (filter: { location?: string; category?: string }) => {
    setSearchParams(prev => ({
      ...prev,
      ...(filter.location !== undefined && { location: filter.location }),
      ...(filter.category !== undefined && { category: filter.category })
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SearchFilters 
          onSearch={handleSearch} 
          onFilter={handleFilter}
          currentFilters={searchParams}
        />

        {destinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination: any) => (
              <DestinationCardV2
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              Tidak ada destinasi yang ditemukan
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
