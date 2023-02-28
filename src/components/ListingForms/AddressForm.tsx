import { useEffect, useState } from "react";

export default function AddressForm({ changeAddress, changeName }: { changeAddress: Function, changeName: Function }) {
  const [street, setStreet] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [name, setName] = useState<string>("");

  const placeHolders = [
    "Street Address",
    "Apt, Suite, Building Number (Optional)",
    "City",
    "Postal Code",
  ];
  const setters = [setStreet, setApartment, setCity, setZip];

  useEffect(() => {
    changeAddress(`${street} ${apartment} ${city} ${zip} ${name}`);
    changeName(name);
  }, [street, apartment, city, zip, name]);

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
            />
          );
        })}
        <h3 className="pt-5 pb-5">Enter a name for this Listing.</h3>
        <input
          onChange={(event) => setName(event.target.value)}
          className="h-[60px] pl-5 bg-bxBoxLight rounded-3xl mb-3"
          placeholder="Name"
        />
      </div>
    </div>
  );
}
