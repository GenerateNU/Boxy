import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import ListingAddressForm from "@/components/ListingAddressForm";
import ListingDatesForm from "@/components/ListingDatesForm";
import ListingSpaceTypeForm from "@/components/ListingSpaceTypeForm";

export default function ListingCreate({}: any) {
  const { data, status } = useSession();

  const [address, setAddress] = useState();
  const [listingName, setListingName] = useState();
  const [datesAvailable, setDatesAvailable] = useState();
  const [listingDetails, setListingDetails] = useState({});

  const [currentForm, setCurrentForm] = useState("address");
  const forms = ["address", "dates", "space type", "submit"];

  if (status === "unauthenticated") {
    signIn();
  }

  function updateListingAttribute(
    listingAttribute: string,
    listingAttributeValue: any
  ) {
    if (listingAttribute === "address") {
      setAddress(listingAttributeValue);
    } else if (listingAttribute === "name") {
      setListingName(listingAttributeValue);
    }
  }

  function renderCurrentForm() {
    switch (currentForm) {
      case "address":
        return (
          <ListingAddressForm
            updateListingAttribute={updateListingAttribute}
          ></ListingAddressForm>
        );
      case "dates":
        return (
          <ListingDatesForm
            updateListingAttribute={updateListingAttribute}
          ></ListingDatesForm>
        );
      case "amenities":
        return <></>;
      case "space type":
        return <ListingSpaceTypeForm></ListingSpaceTypeForm>;
      case "submit": // review details before submit page
        return <></>;
      default: // "listing creation success page"
        return <></>;
    }
  }

  async function createListing() {
    console.log(address);
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

    res.status == 200 &&
      alert("listing created (will eventually redirect to my listings)");
  }

  return (
    <div className="container flex justify-center min-w-full pt-20">
      {renderCurrentForm()}
      {/* {currentForm === "submit" ? (
        <button onClick={createListing}>Submit</button>
      ) : (
        <button
          onClick={() => setCurrentForm(forms[forms.indexOf(currentForm) + 1])}
        >
          Next
        </button>
      )} */}
      <div className="absolute bottom-10 w-[80%]">
        <div className="flex justify-between">
          {currentForm === "submit" ? (
            <button
              className="bg-[#7C7C7C] h-[5vh] w-[8vw] mb-7 right-2 rounded-full text-white"
              onClick={createListing}
            >
              Submit
            </button>
          ) : (
            <>
              <div className="">
                <button
                  className="border border-solid border-black h-[5vh] w-[8vw] mb-7 right-2 rounded-full text-black"
                  onClick={() =>
                    setCurrentForm(forms[forms.indexOf(currentForm) - 1])
                  }
                >
                  Back
                </button>
              </div>
              <div className="">
                <button
                  className="bg-[#7C7C7C] h-[5vh] w-[8vw] mb-7 right-2 rounded-full text-white"
                  onClick={() =>
                    setCurrentForm(forms[forms.indexOf(currentForm) + 1])
                  }
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
        <div
          id="progress-bar"
          className="h-[6px] bg-bxBoxLight grid grid-cols-8"
        >
          <div className="bg-[#B3B3B3]"></div>
        </div>
      </div>
    </div>
  );
}
