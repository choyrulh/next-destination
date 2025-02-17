import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin } from 'lucide-react';


export default function Wislist(){

	 const wishlistItems = [
    {
      id: 1,
      title: 'Emerald Lake Retreat',
      location: 'Swiss Alps, Switzerland',
      image: '/wishlist-1.jpg',
      rating: 4.9,
      price: '$299/night'
    },
    {
      id: 2,
      title: 'Golden Sands Resort',
      location: 'Maldives',
      image: '/wishlist-2.jpg',
      rating: 4.8,
      price: '$599/night'
    },
    // Add more items as needed
  ];

	
	return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 animate-slide-up">
            Your Dream Destinations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            All your saved favorites in one place - start planning your next adventure!
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block bg-white p-8 rounded-2xl shadow-lg">
              <Heart className="w-20 h-20 text-pink-400 mx-auto mb-6" />
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Your Wishlist is Empty
              </h2>
              <p className="text-gray-600 mb-6">
                Start exploring amazing destinations and add them to your wishlist!
              </p>
              <Link href="/categories" className="bg-cyan-600 text-white px-8 py-3 rounded-full 
                font-semibold hover:bg-cyan-700 transition-colors duration-300">
                Explore Destinations
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl 
                  transition-all duration-300 group relative"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Heart className="w-8 h-8 text-red-500 drop-shadow-lg" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center bg-cyan-100 text-cyan-800 px-3 py-1 
                      rounded-full text-sm font-semibold">
                      ⭐ {item.rating}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2 text-cyan-600" />
                    <span>{item.location}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-cyan-600">{item.price}</span>
                    <Link 
                      href={`/destinations/${item.id}`}
                      className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full 
                        hover:bg-cyan-600 hover:text-white transition-colors duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}