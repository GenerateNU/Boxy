import Link from "next/link";
import { useState } from "react";
import Listing from "./listing";
import { useSession, signIn, signOut } from "next-auth/react";
import { AiOutlinePlus } from "react-icons/ai";

type Listing = {
  listing_id: string;
  name: string;
  price: string;
  proximity: string;
};

export default function ListingsPage({
  listingsAll,
  listingsListed,
  listingsUnlisted,
  listingsInProgress,
}: any) {
  const [tabState, setTabState] = useState("all");

  const renderListingElements = (listings: []) => {
    if (listings.length == 0) {
      return <h1>You have no listings!</h1>;
    } else {
      return (
        listings &&
        listings.map((listing: Listing) => {
          return <Listing listing={listing} />;
        })
      );
    }
  };

  function renderCurrentForm() {
    switch (tabState) {
      case "all":
        return renderListingElements(listingsAll);
      case "listed":
        return renderListingElements(listingsListed);
      case "unlisted":
        return renderListingElements(listingsUnlisted);
      case "progress":
        return renderListingElements(listingsInProgress);
    }
  }

  const listing_tab = (state: string, text: string) => {
    return (
      <button
        onClick={() => setTabState(state)}
        className={
          tabState == state
            ? "flex justify-center border-b-2 border-b-black col-span-1 text-black"
            : "flex justify-center border-b-2 col-span-1 text-gray-500"
        }
      >
        <div className="h-2/3 flex justify-center items-center">
          <h3>{text}</h3>
        </div>
      </button>
    );
  };

  return (
    <div className="container flex justify-center min-w-full pt-20">
      <div className="w-[50vw] flex-col">
        <h1 className="text-3xl pb-10">My Listings</h1>
        <div className="grid grid-cols-6 w-[100%] h-[7vh] mb-5">
          {listing_tab("all", "All")}
          {listing_tab("listed", "Listed")}
          {listing_tab("unlisted", "Unlisted")}
          {listing_tab("progress", "In Progress")}
          <div className="col-span-2 flex justify-end border-b-2">
            <Link href="/listing/create" className="h-2/3 w-[55%]">
              <button className="flex h-full w-full justify-center items-center rounded-3xl outline outline-gray-500 text-gray-500 hover:outline-black hover:text-black">
                <AiOutlinePlus />
                <h3 className="ml-1">New Listing</h3>
              </button>
            </Link>
          </div>
        </div>
        {renderCurrentForm()}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      listingsAll: await (
        await fetch(
          "http://localhost:3000/api/listings?" +
            new URLSearchParams({
              price: "22",
            })
        )
      ).json(),
      listingsListed: await (
        await fetch(
          "http://localhost:3000/api/listings?" +
            new URLSearchParams({
              price: "100",
            })
        )
      ).json(),
      listingsUnlisted: await (
        await fetch(
          "http://localhost:3000/api/listings?" +
            new URLSearchParams({
              price: "200",
            })
        )
      ).json(),
      listingsInProgress: await (
        await fetch(
          "http://localhost:3000/api/listings?" +
            new URLSearchParams({
              price: "10",
            })
        )
      ).json(),
    },
  };
}
