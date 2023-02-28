import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import AddressForm from "@/components/ListingForms/AddressForm";
import DatesForm from "@/components/ListingForms/DatesForm";
import SpaceTypeForm from "@/components/ListingForms/SpaceTypeForm";
import AmenitiesForm from "@/components/ListingForms/AmenitiesForm";
import ItemsForm from "@/components/ListingForms/ItemsForm";
import SubmitForm from "@/components/ListingForms/SubmitForm";
import { useRouter } from "next/router";

export default function ListingCreate({}: any) {
  const { data, status } = useSession();

  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [listingName, setListingName] = useState();
  const [datesAvailable, setDatesAvailable] = useState();
  const [price, setPrice] = useState();
  const [spaceType, setSpaceType] = useState("");
  const [listingDetails, setListingDetails] = useState({});
  const [amenities, setAmenities] = useState();
  const [items, setItems] = useState();

  const [currentForm, setCurrentForm] = useState(0);

  const forms = [
    <AddressForm changeAddress={setAddress} changeName={setListingName}/>,
    <DatesForm/>,
    <AmenitiesForm/>,
    <SpaceTypeForm />,
    <ItemsForm/>,
    <SubmitForm fields={[
        address,
        datesAvailable,
        amenities,
        spaceType,
        items,
      ]} 
      changeForm={setCurrentForm}
    />,
  ];

  const router = useRouter();

  if (status === "unauthenticated") {
    signIn();
  }

  async function createListing() {
    const res = await fetch("http://localhost:3000/api/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: listingName,
        dates_available: [],
        price: 1,
        description: "",
        amenities: [],
        space_type: "Basement",
        address: "1234 Huntington Ave",
        city: "boston",
        zip_code: "02115",
        state: "CA",
        space_available: [1, 2, 3],
        longitude: 2,
        latitude: 1,
      }),
    });

    res.status == 200 && router.push("http://localhost:3000/listings");
  }

  return (
    <div className="container flex justify-center min-w-full pt-20">
      {forms[currentForm]}
      <div className="absolute bottom-0 pb-10 w-[80%] bg-white">
        <div className="flex justify-between">
          <div>
            {currentForm !== 0 ? (
              <button
                className="border border-solid border-black h-[5vh] w-[8vw] mb-7 right-2 rounded-full text-black"
                onClick={() =>
                  setCurrentForm(
                    currentForm !== 0 ? currentForm - 1 : currentForm
                  )
                }
              >
                Back
              </button>
            ) : (
              <div />
            )}
          </div>
          <div>
            {currentForm === 5 ? (
              <button
                className="bg-[#7C7C7C] h-[5vh] w-[8vw] mb-7 ml-auto right-2 rounded-full text-white"
                onClick={createListing}
              >
                Submit
              </button>
            ) : (
              <button
                className="bg-[#097275] h-[5vh] w-[8vw] mb-7 right-2 rounded-full text-white"
                onClick={() => 
                  setCurrentForm(
                    currentForm !== 5 ? currentForm + 1 : currentForm
                  )
                }
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div
          id="progress-bar"
          className="h-[6px] bg-bxBoxLight grid grid-cols-6"
        >
          {forms.slice(0, currentForm + 1).map((_, i) => {
            return <div className="bg-[#B3B3B3]" key={i}/>;
          })}
        </div>
      </div>
    </div>
  );
}
