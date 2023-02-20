import Link from "next/link";
import { GetServerSideProps } from "next/types";

type Listing = {
  name: string;
  price: string;
  proximity: string;
};

export default function ListingsPage({ listings }) {
  return (
    <>
      {listings.map((listing: any) => {
        return (
          <h1>
            {"$" + listing.price + " " + listing.name + " " + listing.proximity}
          </h1>
        );
      })}
      <Link href="/login">Login</Link>
    </>
  );
}

export async function getServerSideProps(context: GetServerSideProps) {
  return {
    props: {
      listings: await (
        await fetch("http://localhost:3000/api/listings")
      ).json(),
    },
  };
}
