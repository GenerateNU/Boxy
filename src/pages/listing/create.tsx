import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import ListingAddressForm from "@/components/ListingAddressForm";
import ListingDatesForm from "@/components/ListingDatesForm";
import ListingAmenitiesForm from "@/components/ListingAmenitiesForm"
import ListingItemsForm from "@/components/ListingItemsForm"
import { BiPencil } from "react-icons/bi";
import ListingSpaceTypeForm from "@/components/ListingSpaceTypeForm";
import { useRouter } from "next/router";

export default function ListingCreate({}: any) {
  const { data, status } = useSession();

  const [address, setAddress] = useState();
  const [listingName, setListingName] = useState();
  const [datesAvailable, setDatesAvailable] = useState();
  const [listingDetails, setListingDetails] = useState({});

  const [currentForm, setCurrentForm] = useState("address");
  const forms = ["address", "dates", "amenities","items", "space type", "submit"];

  const router = useRouter();

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
        return (
          <ListingAmenitiesForm></ListingAmenitiesForm>
        );
      case "items":
        return (
          <ListingItemsForm></ListingItemsForm>
        );
      case "space type":
        return <ListingSpaceTypeForm></ListingSpaceTypeForm>;
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
                case "items":
                  setCurrentForm("items");
                  break;
                case "space type":
                  setCurrentForm("space type");
                  break;
                default: //add more forms when we make them
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
      {renderCurrentForm()}
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
                  onClick={() => {
                    if (forms.indexOf(currentForm) - 1 >= 0) {
                      setCurrentForm(forms[forms.indexOf(currentForm) - 1]);
                    } else {
                      // need to redirect form back to home page here
                      
                    }
                  }}
                >
                  Back
                </button>
              </div>
              <div className="">
                <button
                  className="bg-[#097275] h-[5vh] w-[8vw] mb-7 right-2 rounded-full text-white"
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
    <div className="w-1/2 flex justify-center">
      <div className="container h-full font-Inter mb-2">
        <div className="h-6 text-3xl mb-6">Review Responses</div>
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
