import { useEffect, useState } from "react";

const useLocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      if ("geolocation" in navigator) {
        try {
          const permissionStatus = await navigator.permissions.query({
            name: "geolocation",
          });

          if (permissionStatus.state === "denied") {
            setError("Location access denied by user.");
            return;
          }

          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              console.log("Lat, Long:", latitude, longitude);
              setLocation({ latitude, longitude });
            },
            (error) => {
              setError(error.message);
              console.error("Error getting location:", error);
            }
          );
        } catch (err) {
          console.error("Permission check error:", err);
        }
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  return { location, error };
};

export default useLocation;
