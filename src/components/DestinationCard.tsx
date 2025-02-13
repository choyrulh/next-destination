import { DestinationTypes } from "@/types/destinasi";
import Image from "next/image";
import Link from "next/link";

interface DestinationCardProps {
  destination: DestinationTypes;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <article className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm">
      <Link href={`/destinasi/${destination.id}`}>
        <Image
          width={560}
          height={720}
          className="w-full h-48 rounded-t-md"
          priority={true}
          src={destination.image.src}
          alt={destination.image.alt}
        />
        <div className="pt-3 ml-4 mr-2 mb-3">
          <h3 className="text-xl text-gray-300">{destination.title}</h3>
          <p className="text-gray-400 text-sm mt-1">
            {destination.description}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default DestinationCard;
