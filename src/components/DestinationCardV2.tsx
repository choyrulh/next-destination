import Image from "next/image";
import Link from "next/link";

// components/DestinationCard.tsx
interface Destination {
  id: string;
  title: string;
  location: string;
  category: string;
  image: {
    src: string;
    alt: string;
  };
  description: string;
}

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCardV2({ destination }: DestinationCardProps) {
  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-w-16 aspect-h-9 rounded-t-xl overflow-hidden">
        <Image
          src={destination.image.src}
          alt={destination.image.alt}
          width={560}
          height={720}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
            {destination.category}
          </span>
          <span className="text-sm text-gray-500">
            📍 {destination.location}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {destination.title}
        </h3>
        <p className="text-gray-600 line-clamp-3">{destination.description}</p>
        <Link
          href={`/destinasi/${destination.id}`}
          className="mt-4 inline-block text-emerald-600 hover:text-emerald-700 font-medium"
        >
          Selengkapnya →
        </Link>
      </div>
    </div>
  );
}
