import Link from "next/link";
import { useState } from "react";
import Listing from "./listing";
import { useSession, signIn, signOut } from "next-auth/react";

type Listing = {
  listing_id: string;
  name: string;
  price: string;
  proximity: string;
};

export default function ListingsPage({ listings }: any) {
  const [tabState, setTabState] = useState("all");

  const listing_tab = (state: string, text: string) => {
    return (
      <button
        onClick={() => setTabState(state)}
        className={
          tabState == state
            ? "flex justify-center border-b-2 border-b-black"
            : "flex justify-center border-b-2"
        }
      >
        {text}
      </button>
    );
  };

  return (
    <div className="container flex justify-center min-w-full pt-20">
      <div className="w-[50vw] flex-col">
        <h1 className="text-3xl pb-10">My Listings</h1>
        <div className="grid grid-cols-4 w-4/6 h-[7vh] mb-5">
          {listing_tab("all", "All")}
          {listing_tab("listed", "Listed")}
          {listing_tab("unlisted", "Unlisted")}
          {listing_tab("progress", "In Progress")}
        </div>
        {listings.map((listing: Listing) => {
          return <Listing listing={listing} />;
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      listings: await (
        await fetch("http://localhost:3000/api/listings")
      ).json(),
    },
  };
}
