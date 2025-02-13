"use client";

import DestinationList from "@/fragments/DestinationList";
import useDestinations from "@/hook/useDestination";

export default function Home() {
  const { data, isLoading } = useDestinations();

  return (
    <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
      <div className="text-center">
        <h1 className="text-3xl text-gray-100 font-semibold">Travel Web</h1>
        <p className="mt-3 text-gray-300">Pilih Destinasimu</p>
      </div>
      <DestinationList destinations={data} isLoading={isLoading} />
    </section>
  );
}
