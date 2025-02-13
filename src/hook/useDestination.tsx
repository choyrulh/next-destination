import { useEffect, useState } from "react";
import fetchData from "@/service/fetchApi";
import { DestinationTypes } from "@/types/destinasi";

const useDestinations = () => {
  const [data, setData] = useState<DestinationTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setIsLoading(true);
        const response = await fetchData();
        const { data } = response;
        setData(data);
      } catch (error) {
        console.error("terdapat error pada: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  return { data, isLoading };
};

export default useDestinations;
