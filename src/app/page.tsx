"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DestinationTypes } from "./../types/destinasi";
import SkeletonImage from "./../components/Skeleton";
import Link from "next/link";

export default function Home() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetch("/api/destinasi")
      .then((res) => res.json())
      .then((data) => setDatas(data));
  }, []);
  const { data }: any = datas;
  console.log(data);

  return (
    <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
      <div className="text-center">
        <h1 className="text-3xl text-gray-100 font-semibold">Travel Web</h1>
        <p className="mt-3 text-gray-300">Pilih Destinasimu</p>
      </div>
      <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((item: DestinationTypes) => (
          <article
            className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
            key={item.id}
          >
            <Link href={`/destinasi/${item.id}`}>
              <Image
                width={560}
                height={720}
                className="w-full h-48 rounded-t-md"
                priority={true}
                src={item.image.src}
                alt={item.image.alt}
              />
              <div className="pt-3 ml-4 mr-2 mb-3">
                <h3 className="text-xl text-gray-300">{item.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{item.description}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
