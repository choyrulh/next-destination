export interface DestinationTypes {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  lat: number;
  lon: number;
  image: {
    src: string;
    alt: string;
  };
  _id: string;
}
