import { AiOutlineRight } from "react-icons/ai";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Listing({ listing }: any) {
  const link = "/listings/" + listing.listing_id

  return (
    <Link href={link}>
      <div
        className="w-full hover:bg-bxBoxLight border-2 rounded-3xl h-[17.5vh] mb-5 grid grid-cols-2"
      >
        <div className="h-full flex items-center pl-10">
          <h2>{listing.name}</h2>
        </div>
        <div className="h-full flex items-center justify-end pr-7">
          <div className="w-[25%] rounded-lg flex bg-bxBrand items-center justify-center center mr-5">
            <h3 className="pr-2 pt-2 pb-2 pl-2 text-white">Listed</h3>
          </div>
          <AiOutlineRight style={{ fontSize: "20px", color: "#B5B5B5" }} />
        </div>
      </div>
    </Link>
  );
}
