import { useEffect, useState } from "react";
import axios from "axios";

export default function AddressForm(props: any) {
  const [address, setAddress] = useState(props.address);
  const [city, setCity] = useState(props.city);
  const [zipCode, setZipCode] = useState(props.zipCode);
  const [name, setName] = useState(props.name);
  const [latitude, setLatitude] = useState(props.latitude);
  const [longitude, setLongitude] = useState(props.longitude);

  const placeHolders = ["Street Address", "City", "Postal Code"];

  const setters = [setAddress, setCity, setZipCode];
  const values = [address, city, zipCode];

  const getAddressPosition = async (address: any) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`
      );
      const { lat, lon } = response.data[0];
      return { latitude: lat, longitude: lon };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const updateAddressPosition = async () => {
      const position = await getAddressPosition(address);
      if (position) {
        setLatitude(position.latitude);
        setLongitude(position.longitude);
      }
    };
    updateAddressPosition();
  }, [address]);

  return (
    <div className="container min-w-full flex flex-col items-center pt-[5vh]">
      <div className="w-3/6 flex flex-col ">
        <h1 className="text-3xl pb-2">Address</h1>
        <h3 className="pb-5">Please provide the Storage Host full address.</h3>
        {placeHolders.map((field, i) => {
          return (
            <input
              onChange={(event) => setters[i](event.target.value)}
              className="h-[60px] pl-5 bg-bxBoxLight rounded-3xl mb-3"
              placeholder={field}
              key={i}
              value={values[i]}
            />
          );
        })}
        <h3 className="pt-5 pb-5">Enter a name for this Listing.</h3>
        <input
          onChange={(event) => setName(event.target.value)}
          className="h-[60px] pl-5 bg-bxBoxLight rounded-3xl mb-3"
          placeholder="Name"
          value={name}
        />
      </div>
    </div>
  );
}
