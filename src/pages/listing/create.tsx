import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import ListingAddressForm from "@/components/ListingAddressForm";
import ListingDatesForm from "@/components/ListingDatesForm";
import { BiPencil } from "react-icons/bi";

export default function ListingCreate({}: any) {
  const { data, status } = useSession();

  const [address, setAddress] = useState<string>();
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
            datesAvailable={datesAvailable}
            amenities={""}
            spaceDescription={""}
            itemDescription={""}
            sizeDescription={""}
            images={[]}
            identification={""}
            onEdit={(formName: string) => {
              switch (formName) {
                case "address":
                  setCurrentForm("address");
                  break;
                case "name":
                  setCurrentForm("name");
                  break;
                case "dates":
                  setCurrentForm("dates");
                  break;
                case "amenities":
                  setCurrentForm("amenities");
                  break;
                case "space type":
                  setCurrentForm("space type");
                  break;
                default:
                  break;
              }
            }}
          ></CreateSubmitPage>
        );
      default: // "listing creation success page"
        return <></>;
    }
  }

  async function createListing() {
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
        <div className="flex justify-center pt-4">
          <div className="flex justify-between w-2/3">
            <button
              className="border rounded-2xl h-10 w-28 text-sm"
              onClick={() =>
                setCurrentForm(forms[forms.indexOf(currentForm) - 1])
              }
            >
              Back
            </button>
            <button
              onClick={createListing}
              className="border rounded-2xl bg-[#097275] text-white h-10 w-28 text-sm"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center pt-4">
          <div className="flex justify-between w-2/3">
            <button
              className="border rounded-2xl h-10 w-28 text-sm"
              onClick={() => {
                if (forms.indexOf(currentForm) - 1 >= 0) {
                  setCurrentForm(forms[forms.indexOf(currentForm) - 1]);
                }
              }}
            >
              Back
            </button>
            <button
              className="border rounded-2xl bg-[#097275] text-white h-10 w-28 text-sm"
              onClick={() =>
                setCurrentForm(forms[forms.indexOf(currentForm) + 1])
              }
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function CreateSubmitPage({
  address,
  datesAvailable,
  amenities,
  spaceDescription,
  itemDescription,
  sizeDescription,
  images,
  identification,
  onEdit,
}: {
  address: any;
  datesAvailable: any;
  amenities: string;
  spaceDescription: string;
  itemDescription: string;
  sizeDescription: string;
  images: string[];
  identification: string;
  onEdit: (formName: string) => void;
}) {
  const [editingForm, setEditingForm] = useState("");

  const info_grid = (category: string, formName: string, info: any) => {
    const handleClick = (formName: string) => {
      //go back to one of the forms
      setEditingForm(formName);
      onEdit(formName);
    };
    return (
      <div className="grid grid-cols-2 w-full place-content-between gap-4 rounded-md bg-[#F8F8F8]">
        <div className=" font-Satoshi p-1"> {category} </div>
        <div className="flex justify-end p-1">
          <button onClick={() => handleClick(formName)}>
            <BiPencil size={20} />
          </button>
        </div>
        <div className="text-sm p-1 font-thin col-span-2"> {info}</div>
      </div>
    );
  };

  return (
    <div className="flex justify-center">
      <div className="container h-full w-1/3 font-Inter mb-2">
        <div className="h-6 text-xl mb-6 font-bold">Review Responses</div>
        <div className="flex flex-col justify-between items-center gap-1">
          {info_grid("Address", "address", address)}
          {info_grid("Dates", "dates", datesAvailable)}
          {info_grid("Amentities", "amentities", amenities)}
          {info_grid(
            "Storage Space Description",
            "NEEDTOCHANGE",
            spaceDescription
          )}
          {info_grid("Item Description", "NEEDTOCHANGE", itemDescription)}
          {info_grid("Size Description", "NEEDTOCHANGE", sizeDescription)}
          {info_grid("Images", "NEEDTOCHANGE", images)}
          {info_grid("Identification", "NEEDTOCHANGE", identification)}
        </div>
      </div>
    </div>
  );
}
