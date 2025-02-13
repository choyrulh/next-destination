"use client";

import { DestinationCardV2 } from "@/components/DestinationCardV2";
import { SearchFilters } from "@/components/SearchFilters";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const [destinations, setDestinations] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch initial data
    fetchDestinations();
    fetchFilters();
  }, []);

  const fetchDestinations = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/destinasi/filterby?${query}`);
    const data = await res.json();
    setDestinations(data.data);
  };

  const fetchFilters = async () => {
    const [locationsRes, categoriesRes] = await Promise.all([
      fetch("/api/destinations/locations"),
      fetch("/api/destinations/categories"),
    ]);
  };

  const handleSearch = (query: string) => {
    router.push({ query: { ...router.query, q: query } });
    fetchDestinations({ ...router.query, q: query });
  };

  const handleFilter = (filter: { location?: string; category?: string }) => {
    const newQuery = { ...router.query, ...filter };
    router.push({ query: newQuery });
    fetchDestinations(newQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SearchFilters onSearch={handleSearch} onFilter={handleFilter} />

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
