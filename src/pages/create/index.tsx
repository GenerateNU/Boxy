import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import AddressForm from "src/components/AddressForm";
import DatesForm from "src/components/DatesForm";

export default function CreateListingPage({}: any) {
  const [address, setAddress] = useState();
  const [name, setName] = useState();
  const [datesAvailable, setDatesAvailable] = useState();
  const [listingDetails, setListingDetails] = useState({});

  const [currentForm, setCurrentForm] = useState("address");
  const forms = ["address", "dates", "submit"];

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
      case "space type":
        return <></>;
      case "submit": // review details before submit page
        return <CreateSubmitPage></CreateSubmitPage>;
      default: // "listing creation success page"
        return <></>;
    }
  }

  function createListing() {
    console.log(address);
    // get all inputs stored in state and post to create listing endpoint
  }

  return (
    <div className="flex-col min-w-full pt-10">
      {renderCurrentForm()}
      {currentForm === "submit" ? (
        <button onClick={createListing} className="">
          Submit
        </button>
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

export function CreateSubmitPage(Data: any) {
  const info_grid = (category: string, info: any) => {
    const handleClick = (category: string) => {
      //go back to one of the forms
    };

    return (
      <div className="grid grid-cols-2 w-full place-content-between h-30 g-2">
        <div> {category} </div>
        <div className="flex justify-end">
          <button onClick={() => handleClick(category)}>
            <BiPencil size={20} />
          </button>
        </div>
        <div> {info}</div>
      </div>
    );
  };

  return (
    <div className="container h-full w-1/3 font-Inter mb-2">
      <div className="h-6 text-xl mb-8">Review Responses</div>
      <div className="d flex flex-col justify-between items-center gap-8">
        {info_grid("Address", "ASD")}
        {info_grid("Name", "ASD")}
        {info_grid("Dates", "ASD")}
        {info_grid("Amentities", "ASD")}
        {info_grid("Storage Space Description", "ASD")}
        {info_grid("Item Description", "ASD")}
        {info_grid("Size Description", "ASD")}
        {info_grid("Images", "ASD")}
        {info_grid("Identification", "ASD")}
      </div>
    </div>
  );
}
