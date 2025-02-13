'use client'

import { DestinationTypes } from "@/types/destinasi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {MapPin} from "lucide-react"

interface DestinationDetailProps {
  destination: DestinationTypes;
}

function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [destination, setDestination] = useState<any>({});

  useEffect(() => {
    const fetchDestinations = async () => {
      const res = await fetch(`/api/destinasi/${id}`);
      const data = await res.json();
      setDestination(data.data);
    };

    fetchDestinations();
  }, [id]);

  console.log(id);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Image
            width={560}
            height={720}
            src={destination.image?.src}
            alt={destination.image?.alt}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold text-gray-900">
              {destination.title}
            </h1>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
              {destination.category}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <p className="text-lg">{destination.location}</p>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {destination.description}
          </p>
          <div className="mt-8 bg-gray-100 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Lokasi Peta</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <iframe
                className="w-full h-64"
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyCNEBM0-CR3oRUbjxsUxXtuNMhH3Lkdgek&center=${destination.lat},${destination.lon}&zoom=14`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
