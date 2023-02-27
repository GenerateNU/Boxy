import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import ListingAddressForm from "@/components/ListingAddressForm";
import ListingDatesForm from "@/components/ListingDatesForm";
import { BiPencil } from "react-icons/bi";

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

  async function createListing() {
    console.log(address);
    const res = await fetch("http://localhost:3000/api/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "test",
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

    res.status == 200 && alert("listing created");
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
    console.log(address);
    return (
      <div className="grid grid-cols-2 w-full place-content-between gap-4 rounded-md bg-[#F8F8F8]">
        <div className="font-bold font-Satoshi p-1"> {category} </div>
        <div className="flex justify-end p-1">
          <button onClick={() => handleClick(category)}>
            <BiPencil size={20} />
          </button>
        </div>
        <div className="text-sm p-1"> {info}</div>
      </div>
    );
  };

  return (
    <div className="flex justify-center">
      <div className="container h-full w-1/3 font-Inter mb-2">
        <div className="h-6 text-xl mb-8 font-bold">Review Responses</div>
        <div className="d flex flex-col justify-between items-center gap-3">
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
