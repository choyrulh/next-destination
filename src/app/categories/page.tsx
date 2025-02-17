import Link from 'next/link';
import { Sun, Mountain, Globe, Music, Heart, Lightbulb, Activity, Calendar } from 'lucide-react';


export default function Categories() {
  const categories = [
    { title: 'Beach Holidays', count: 12, icon: <Sun className="h-5 w-5" /> },
    { title: 'Mountain Trekking', count: 8, icon: <Mountain className="h-5 w-5" /> },
    { title: 'Cultural Tours', count: 15, icon: <Activity className="h-5 w-5" /> },
    { title: 'Adventure Sports', count: 10, icon: <Activity className="h-5 w-5" /> },
    { title: 'Beach', count: 7, icon: <Sun className="h-5 w-5" /> },
    { title: 'Cultural', count: 5, icon: <Lightbulb className="h-5 w-5" /> },
    { title: 'Culture', count: 20, icon: <Lightbulb className="h-5 w-5" /> },
    { title: 'Hiburan', count: 19, icon: <Music className="h-5 w-5" /> },
    { title: 'Island', count: 14, icon: <Globe className="h-5 w-5" /> },
    { title: 'Legends', count: 15, icon: <Heart className="h-5 w-5" /> },
    { title: 'Nature', count: 11, icon: <Mountain className="h-5 w-5" /> },
    { title: 'Religion', count: 7, icon: <Calendar className="h-5 w-5" /> }
  ];


  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-100">
          Travel Categories
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={index}
              href="/destinations"
              className="bg-[#222222] p-8 rounded-xl shadow-sm hover:shadow-lg transition-all 
                duration-300 group hover:bg-black/20 cursor-pointer"
            >
               {category.icon}
                <span>{category.title} ({category.count})</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}