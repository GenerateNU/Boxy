import { useState } from "react";
import AddressForm from "src/components/AddressForm";
import DatesForm from "src/components/DatesForm";
import IdentificationForm from "src/components/IdentificationForm";

export default function CreateListingPage({}: any) {
  const [address, setAddress] = useState();
  const [name, setName] = useState();
  const [datesAvailable, setDatesAvailable] = useState();
  const [listingDetails, setListingDetails] = useState({});

  const [currentForm, setCurrentForm] = useState("address");
  const forms = ["address", "dates", "identification", "submit"];

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
          <AddressForm
            updateListingAttribute={updateListingAttribute}
          ></AddressForm>
        );
      case "dates":
        return <DatesForm></DatesForm>;
      case "amenities":
        return <></>;
      case "identification":
        return <IdentificationForm></IdentificationForm>;
      case "space type":
        return <></>;
      default: // review details before submit page
        return <></>;
    }
  }

  function createListing() {
    console.log(address);
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
