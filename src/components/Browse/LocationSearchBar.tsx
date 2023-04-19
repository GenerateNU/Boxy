import { Coordinate } from "@/pages/_app";
import { useState } from "react";

type LocationSuggestion = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
};

export function LocationSearchBar(props: { setCoordinates: any }) {
  const [locationSearchSuggestions, setLocationSearchSuggestions] = useState<
    LocationSuggestion[]
  >([]);
  const [locationSearchInput, setLocationSearchInput] = useState("");

  async function getLocationSuggestions(locationSearchInput: string) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${locationSearchInput}&addressdetails=1&countrycodes=us&limit=5`
    );
    const data = await response.json();

    setLocationSearchSuggestions(data);
  }

  return (
    <div className="relative">
      <input
        id="search_input"
        className="h-[100%] w-[60vw] md:w-[70vw] lg:w-[33vw] pl-5 border-[2px] border-[#B5B5B5] rounded-lg"
        placeholder="Enter a location"
        value={locationSearchInput}
        onChange={(event) => {
          setLocationSearchInput(event.currentTarget.value);
          getLocationSuggestions(event.currentTarget.value);
        }}
      />
      <ul className="suggestions-dropdown absolute z-10 bg-white border border-gray-300 mt-1 rounded-md w-full">
        {locationSearchSuggestions.map((suggestion) => (
          <li
            key={suggestion.place_id}
            className="px-2 py-1 cursor-pointer hover:bg-gray-200"
            onClick={() => {
              props.setCoordinates({
                latitude: parseInt(suggestion.lat),
                longitude: parseInt(suggestion.lon),
              });
              setLocationSearchInput(suggestion.display_name);
              setLocationSearchSuggestions([])
            }}
          >
            {suggestion.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
