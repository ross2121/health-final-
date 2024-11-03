import { useEffect, useState } from "react";

export type LocationInfo = { placeName: string; latLng: [number, number] };
interface X{
  place_name:string,
  center:number[],

}
export const useSearchLocation = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [locationInfo, setLocationInfo] = useState<LocationInfo[]>([]);

  const debouncedSearchText = useDebouncedValue(searchText, 300);

  useEffect(() => {
    if (!debouncedSearchText) {
      setLocationInfo([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${debouncedSearchText}.json?fuzzyMatch=true&access_token=pk.eyJ1IjoiaWFta2FydGhpY2siLCJhIjoiY2t4b3AwNjZ0MGtkczJub2VqMDZ6OWNrYSJ9.-FMKkHQHvHUeDEvxz2RJWQ`,
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch location data");
        return response.json();
      })
      .then((data) => {
        const filtered = data.features?.map((x:X) => ({
          placeName: x.place_name,
          latLng: [x.center[1], x.center[0]],
        }));
        setLocationInfo(filtered);
      })
      .catch(() => setLocationInfo([])) // Clear location info on error
      .finally(() => setLoading(false));
  }, [debouncedSearchText]);

  return { loading, searchText, setSearchText, locationInfo };
};

export const useDebouncedValue = <T>(value: T, delay: number = 1000): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler); 
  }, [value, delay]);

  return debouncedValue;
};
