'use client';


// pages/destinations/[id].js
import Image from 'next/image';
import {useEffect, useState} from "react"


export default function Destination() {
  const [data, setData] = useState<any>([])

  useEffect(()=>{
    async function fetchData() {
      try {
        const response = await fetch("/api/destinasi/search?q=gunung");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setData(data?.data)
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    fetchData()

  },[])


  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
           <div className="lg:col-span-2">
              {data?.[0] && (
                <Image
                  src={data[0].image?.src}
                  width={1200}
                  height={800}
                  alt={data[0].image?.alt || "Destination"}
                  className="rounded-xl shadow-lg"
                />
              )}
            </div>
          <div className="grid grid-cols-2 gap-4">
            {data?.slice(1).map((item) => (
              <Image
                key={item.id}
                src={item?.image?.src}
                width={600}
                height={400}
                alt={item.image.alt}
                className="rounded-xl shadow-lg"
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-4xl font-bold mb-6 text-gray-100">Mountain Paradise Resort</h1>
            <div className="prose max-w-none mb-8">
              <p className="text-gray-600 leading-relaxed">
                Nestled in the heart of the majestic mountains, this destination offers breathtaking
                views and unforgettable experiences. Perfect for both adventure seekers and those
                looking to relax in nature's lap.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {['Hiking Trails', 'Spa Services', 'Local Cuisine', 'Guided Tours'].map((item) => (
                <div key={item} className="flex items-center p-4 bg-[#111111] rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg mr-4 flex items-center justify-center">
                    <span className="text-cyan-600">✓</span>
                  </div>
                  <h3 className="font-semibold">{item}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Card */}
          <div className="bg-[#111111] p-6 rounded-xl shadow-lg h-fit sticky top-24">
            <div className="mb-4">
              <span className="text-2xl font-bold text-cyan-600">$199</span>
              <span className="text-gray-500"> / night</span>
            </div>
            <button className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold
              hover:bg-cyan-700 transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}