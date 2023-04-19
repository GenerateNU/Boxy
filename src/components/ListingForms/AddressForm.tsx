import { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "@/assets/Navigation.svg";
import FormLayout from "./FormLayout";
]
export default function AddressForm({
  setAddress,
  setAparment,
  setCity,
  setState,
  setName,
  setZipCode,
  setPrice,
  setLatLong,
  address,
  apartment,
  city,
  state,
  zipCode,
  name,
  price,
}: any) {
  const placeHolders = [
    "Street Address",
    "Apt, Suite, Building Number (Optional)",
    "City",
    "State",
    "Postal Code",
  ];
  const setters = [setAddress, setAparment, setCity, setState, setZipCode];
  const values = [address, apartment, city, state, zipCode];
  const [errors, setErrors] = useState([false, false, false, false, false, false, false]);

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

  // returns true if the inputs are ok
  const validate = () => {
    const newErrors = [...errors];
    address ? newErrors[0] = false : newErrors[0] = true;
    city ? newErrors[2] = false : newErrors[2] = true;
    state ? newErrors[3] = false : newErrors[3] = true;
    zipCode.length === 5 ? newErrors[4] = false : newErrors[4] = true;
    name ? newErrors[5] = false : newErrors[5] = true;
    price ? newErrors[6] = false : newErrors[6] = true;
    setErrors(newErrors);
    return !newErrors.includes(true);
  }

  useEffect(() => {
    const updateAddressPosition = async () => {
      const position = await getAddressPosition(address);
      if (position) {
        setLatLong(position);
      }
    };
    updateAddressPosition();
  }, [address]);

  useEffect(() => {
    if (errors.includes(true)) {
      setErrors([false, false, false, false, false, false, false]);
    }
  }, [...values, name, price]);

  return (
    <FormLayout image={Navigation} validate={validate}>
      <div className="flex flex-col w-[90%]">
        <h1 className="text-3xl pb-2">Address</h1>
        <h3 className="pb-5">Please provide the Storage Host full address.</h3>
        {placeHolders.map((field, i) => {
          return (
            <input
              onChange={(event) => setters[i](event.target.value)}
              className={`h-[60px] pl-5 bg-bxBoxLight rounded-lg mb-3 ${errors[i] ? "border-2 border-red-500" : ""}`}
              placeholder={field}
              key={i}
              value={values[i]}
              onFocus={() => setErrors([false, false, false, false, false, false, false])}
            />
          );
        })}
        <h3 className="pt-5 pb-5">Enter a name and price for this Listing.</h3>
        <input
          onChange={(event) => setName(event.target.value)}
          className={`h-[60px] pl-5 bg-bxBoxLight rounded-lg mb-3 ${errors[5] ? "border-2 border-red-500" : ""}`}
          placeholder="Name"
          value={name}
          onFocus={() => setErrors([false, false, false, false, false, false, false])}
        />
        <input
          onChange={(event) => setPrice(event.target.value)}
          className={`h-[60px] pl-5 bg-bxBoxLight rounded-lg mb-3 ${errors[6] ? "border-2 border-red-500" : ""}`}
          placeholder="Price (USD)"
          value={price}
          onFocus={() => setErrors([false, false, false, false, false, false, false])}
        />
      </div>
    </FormLayout>
  );
}
