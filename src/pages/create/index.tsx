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
        return (
          <CreateSubmitPage
            address={address}
            name={name}
            datesAvailable={datesAvailable}
            amenities={""}
            spaceDescription={""}
            itemDescription={""}
            sizeDescription={""}
            images={[]}
            identification={""}
          ></CreateSubmitPage>
        );
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

export function CreateSubmitPage({
  address,
  name,
  datesAvailable,
  amenities,
  spaceDescription,
  itemDescription,
  sizeDescription,
  images,
  identification,
}: //onEdit,
{
  address: any;
  name: any;
  datesAvailable: any;
  amenities: string;
  spaceDescription: string;
  itemDescription: string;
  sizeDescription: string;
  images: string[];
  identification: string;
  //onEdit: (formName: string) => void;
}) {
  const info_grid = (category: string, info: any) => {
    const handleClick = (category: string) => {
      //go back to one of the forms
    };

    return (
      <div className="grid grid-cols-2 w-full place-content-between h-30 g-2">
        <div className="font-bold font-Inter"> {category} </div>
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
    <div className="flex justify-center">
      <div className="container h-full w-1/3 font-Inter mb-2">
        <div className="h-6 text-xl mb-8 font-bold">Review Responses</div>
        <div className="d flex flex-col justify-between items-center gap-8">
          {info_grid("Address", address)}
          {info_grid("Name", name)}
          {info_grid("Dates", datesAvailable)}
          {info_grid("Amentities", amenities)}
          {info_grid("Storage Space Description", spaceDescription)}
          {info_grid("Item Description", itemDescription)}
          {info_grid("Size Description", sizeDescription)}
          {info_grid("Images", images)}
          {info_grid("Identification", identification)}
        </div>
      </div>
    </div>
  );
}
