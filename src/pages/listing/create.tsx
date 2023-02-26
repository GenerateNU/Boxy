import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import ListingAddressForm from "@/components/ListingAddressForm";
import ListingDatesForm from "@/components/ListingDatesForm";

export default function ListingCreate({}: any) {
  const { data, status } = useSession();

  const [address, setAddress] = useState();
  const [name, setName] = useState();
  const [datesAvailable, setDatesAvailable] = useState();
  const [listingDetails, setListingDetails] = useState({});

  const [currentForm, setCurrentForm] = useState("address");
  const forms = ["address", "dates", "submit"];

  if (status === "unauthenticated") {
    signIn();
  }

  function updateListingAttribute(
    listingAttribute: string,
    listingAttributeValue: any
  ) {
    if (listingAttribute === "address") {
      setAddress(listingAttributeValue);
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
        return <></>;
      case "submit": // review details before submit page
        return <></>;
      default: // "listing creation success page"
        return <></>;
    }
  }

  async function createListing() {
    console.log(address);
    await fetch("http://localhost:3000/api/listings", {
      method: "POST",
      body: JSON.stringify({}),
    });
    // get all inputs stored in state and post to create listing endpoint
  }

  return (
    <div className="container flex justify-center min-w-full pt-20">
      {renderCurrentForm()}
      {currentForm === "submit" ? (
        <button onClick={createListing}>Submit</button>
      ) : (
        <button
          onClick={() => setCurrentForm(forms[forms.indexOf(currentForm) + 1])}
        >
          Next
        </button>
      )}
    </div>
  );
}
