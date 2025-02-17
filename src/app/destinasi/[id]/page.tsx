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
            loading="lazy"
            src={destination.image?.src}
            alt={destination.image?.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold text-gray-100">
              {destination.title}
            </h1>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
              {destination.category}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="w-5 h-5" />
            <p className="text-lg">{destination.location}</p>
          </div>
          <p className="text-gray-500 leading-relaxed text-lg">
            {destination.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
