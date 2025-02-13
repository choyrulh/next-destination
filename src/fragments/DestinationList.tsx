import SkeletonImage from "@/components/Skeleton";
import DestinationCard from "@/components/DestinationCard";
import { DestinationTypes } from "@/types/destinasi";
import { DestinationCardV2 } from "@/components/DestinationCardV2";

interface DestinationListProps {
  destinations: DestinationTypes[];
  isLoading: boolean;
}

const DestinationList: React.FC<DestinationListProps> = ({
  destinations,
  isLoading,
}) => {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading
        ? [...Array(destinations.length)].map((_, index) => (
            <article
              className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
              key={index}
            >
              <SkeletonImage />
            </article>
          ))
        : destinations.map((item, index) => (
            <DestinationCardV2
              key={destinations.length + index}
              destination={destinations[index]}
            />
          ))}
    </div>
  );
};

export default DestinationList;
