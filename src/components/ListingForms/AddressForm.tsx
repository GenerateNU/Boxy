import { useEffect, useState } from "react";

export default function AddressForm(props: any) {
  const placeHolders = [
    "Street Address",
    "City",
    "Postal Code",
  ];
  const setters = [props.setAddress, props.setCity, props.setZipCode];
  const values= [props.address, props.city, props.zipCode];

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
          onChange={(event) => props.setName(event.target.value)}
          className="h-[60px] pl-5 bg-bxBoxLight rounded-3xl mb-3"
          placeholder="Name"
          value={props.name}
        />
      </div>
    </div>
  );
}
