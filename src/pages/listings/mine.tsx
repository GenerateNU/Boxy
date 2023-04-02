import Link from "next/link";
import { useState } from "react";
import Listing from "./listing";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/router";

type Listing = {
  listing_id: string;
  name: string;
  price: string;
  proximity: string;
};

export default function ListingsPage({
  listingsAll,
  listingsRequested,
  listingsConfirmed,
}: any) {
  const [tabState, setTabState] = useState("Listings");

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
      case "Listings":
        return renderListingElements(listingsAll);
      case "Requested":
        return renderListingElements(listingsRequested);
      case "Confirmed":
        return renderListingElements(listingsConfirmed);
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
    <div className="container flex justify-center min-w-full pt-16">
      <div className="w-[50vw] flex-col pt-[5vh]">
        <h1 className="text-3xl pb-10">My Listings</h1>
        <div className="grid grid-cols-6 w-[100%] h-[7vh] mb-5">
          {listing_tab("Listings", "Listings")}
          {listing_tab("Requested", "Requested")}
          {listing_tab("Confirmed", "Confirmed")}
          <div className="col-span-2 flex justify-end border-b-2">
            <Link href="/listings/create" className="h-2/3 w-[55%]">
              <button className="flex h-full w-full justify-center items-center rounded-3xl outline outline-gray-500 text-gray-500 hover:outline-black hover:text-black">
                <AiOutlinePlus />
                <h3 className="ml-1">New Listing</h3>
              </button>
            </Link>
          </div>
        </div>
        {renderCurrentForm()}
        <h1>Reservation Requests and Confirmed reservatins (host view)</h1>
        <li>dummy reservation request name</li>
        <li>
          dummy reservation request details... (dates, name of user who
          requested etc.)
        </li>
        <button
          onClick={() => router.push("http://localhost:3000/reservations/mine")}
        >
          accept button
        </button>
        <button>decline button</button>
      </div>
    </div>
  );
}

export async function getServerSideProps() {

  // Get all Listings
  const all_res = await (
      await fetch(
      "http://localhost:3000/api/listings/posted", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )).json();
  
    const all_listings: Listing[] = [];
    if (!(JSON.stringify(all_res) === '{}')) {
      for (const value of all_res["my listings"]) {
        const get_listing_info = await (
          await fetch(
          "http://localhost:3000/api/listings/" + value, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          }
        )).json();
        let newListing: Listing = {
          listing_id: get_listing_info["listing_id"],
          name: get_listing_info["name"],
          price: get_listing_info["price"],
          proximity: "TEMPORARY"
        }
        all_listings.push(newListing)
      }
    };
  
    // Get all Reservations Requests For Host
    const all_reservations_requests = await (
      await fetch(
      "http://localhost:3000/api/reservations/received", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )).json();

    // Requested and Confirmed Reservations 
    const requested_reservations = new Array();
    const confirmed_reservations = new Array();
    if (!(!(JSON.stringify(all_reservations_requests) === '{}'))) {
      for (const value of all_res["my listings"]) {
      // Get All Reservations ID
      const get_reservation_info = await (
        await fetch(
        "http://localhost:3000/api/reservations/" + value, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      )).json();

      // Get Listing Info
      const listing_info = await (
        await fetch(
        "http://localhost:3000/api/listings/" + get_reservation_info["listing_id"], {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      )).json();


      let newListing: Listing = {
        listing_id: listing_info["listing_id"],
        name: listing_info["name"],
        price: listing_info["price"],
        proximity: "TEMPORARY"
      }

      if (get_reservation_info["accepted"]) {
        confirmed_reservations.push(newListing)
      } else {
        requested_reservations.push(newListing)
      }
    };
  }

  return {
    props: {
      listingsAll: all_listings,
      listingsRequested: requested_reservations,
      listingsConfirmed: confirmed_reservations,
    },
  };
}
