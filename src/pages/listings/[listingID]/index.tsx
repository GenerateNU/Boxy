import { useRouter } from "next/router";
import React, { useState } from "react";
import { amenity } from "@prisma/client";

import {
  FaBug,
  FaFireExtinguisher,
  FaDog,
  FaThermometerHalf,
  FaBox,
  FaGlassCheers,
} from "react-icons/fa";

import {
  MdSmokeFree,
  MdOutlineElevator,
  MdOutlineMeetingRoom,
} from "react-icons/md";

export default function ListingDetailsPage({ listing, host }: any) {
  const router = useRouter();
  const { listingID } = router.query;

  const [isGalleryModalOpen, setIsGalleryModalOpen] = React.useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [dropOffDate, setDropOffDate] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [accessDate, setAccessDate] = useState("");

  const toggleGalleryModal = () => {
    setIsGalleryModalOpen(!isGalleryModalOpen);
  };

  const toggleContactModal = () => {
    setIsContactModalOpen(!isContactModalOpen);
  };

  const amenityIcons = new Map<string, JSX.Element>([
    ["Pest_Controlled", <FaBug size={24} />],
    ["Fire_Alarm_System", <FaFireExtinguisher size={24} />],
    ["Smoke_Free", <MdSmokeFree size={24} />],
    ["Pet_Free", <FaDog size={24} />],
    ["Access_to_Elevator", <MdOutlineElevator size={24} />],
    ["Ground_Floor", <MdOutlineMeetingRoom size={24} />],
    ["Climate_Controlled", <FaThermometerHalf size={24} />],
    ["Private_Storage", <FaBox size={24} />],
    ["Party_Free", <FaGlassCheers size={24} />],
  ]);

  function formatAmenityName(name: string) {
    return name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }

  return (
    <div className="flex justify-center flex-col pt-16 ">
      <h1>listing {listingID} details go here</h1>

      <div className="flex justify-center">
        <div className="flex flex-col pt-4 w-4/5">
          <section className="overflow-hidden text-neutral-700">
            <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
              <div className="flex">
                <div className="w-1/2 p-1 md:p-2">
                  <img
                    alt="gallery"
                    className="block h-full w-full rounded-lg object-cover object-center"
                    src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"
                  />
                </div>
                <div className="w-1/2">
                  <div className="flex flex-wrap">
                    <div className="w-1/2 p-1 md:p-2">
                      <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"
                      />
                    </div>
                    <div className="w-1/2 p-1 md:p-2">
                      <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                      />
                    </div>
                    <div className="w-1/2 p-1 md:p-2">
                      <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
                      />
                    </div>
                    <div className="w-1/2 p-1 md:p-2">
                      <button
                        className="relative block h-full w-full rounded-lg bg-gray-200"
                        onClick={toggleGalleryModal}
                      >
                        <img
                          alt="gallery"
                          className="block h-full w-full rounded-lg object-cover object-center"
                          src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
                        />
                        <div className="absolute inset-0 bg-gray-700 opacity-70 rounded-lg"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <span className="text-lg font-semibold">+ {4}</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {isGalleryModalOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">All Images</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <img
                        alt="gallery"
                        className="rounded-lg object-cover object-center"
                        src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"
                      />
                      <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
                      />
                      {/* Add more images here. ALSO HAVE TO ADD SOME SCROLL FEATURE OR SOMETHING*/}
                    </div>
                    <button
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                      onClick={toggleGalleryModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="flex justify-center mt-1">
            <div className="w-9/10 p-4">
              <div className="grid grid-cols-3 grid-rows-4 gap-4">
                <div className="flex flex-col p-4 gap-1 col-span-2">
                  <div className="flex flex-col border-b border-gray-100 p-2">
                    <h2 className="text-xl font-semibold mb-4">
                      {listing.space_available[0]} x{" "}
                      {listing.space_available[1]} ft {listing.space_type}
                    </h2>
                    <p>
                      {listing.city}, {listing.state}
                    </p>
                  </div>
                  <div className="flex flex-col border-b border-gray-100 p-2">
                    <p>{listing.description}</p>
                    <p>Description</p>
                  </div>
                  <div className="flex flex-col border-b border-gray-100 p-2">
                    <h2 className="text-xl font-semibold mb-4">
                      Approximate Space Size: {listing.space_available[0]} x{" "}
                      {listing.space_available[1]} ft
                    </h2>

                    <p>
                      Listing details and description go here. You can add more
                      content related to the listing, such as reviews, owner
                      information, etc.
                    </p>
                  </div>
                  <div className="flex flex-col border-b border-gray-100 p-2">
                    <h2 className="text-xl font-semibold mb-4">Amentities</h2>
                    <ul className="space-y-2">
                      {listing.amenities.map(
                        (
                          amenity: string,
                          index: React.Key | null | undefined
                        ) => (
                          <li
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            {amenityIcons.get(amenity)}
                            <span>{formatAmenityName(amenity)}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="flex flex-col border-b border-gray-100 p-2">
                    <h2 className="text-xl font-semibold mb-4">Questions</h2>
                    <p>
                      Listing details and description go here. You can add more
                      content related to the listing, such as reviews, owner
                      information, etc.
                    </p>
                  </div>
                  <div className="flex flex-col border-b border-gray-100 p-2">
                    <h2 className="text-xl font-semibold mb-4">Hosted By</h2>
                    <div className="flex items-center space-x-4">
                      <img
                        src={""}
                        alt="Host profile"
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{host.name}</p>
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                          onClick={toggleContactModal}
                        >
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>

                  {isContactModalOpen && (
                    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">
                          Contact Host
                        </h2>
                        <p>
                          Email:{" "}
                          <a href={`mailto:${host.email}`}>{host.email}</a>
                        </p>
                        <p>Phone: {host.phone_number}</p>
                        <button
                          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                          onClick={toggleContactModal}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col border-b border-gray-100 p-2">
                    <h2 className="text-xl font-semibold mb-4">
                      Safety as a Stasher
                    </h2>
                    <div className="grid grid-cols-2">
                      <div className="flex flex-col ">
                        <p>The Boxy Protection Plan</p>
                        <p>boxy protection plan here</p>
                      </div>

                      <div className="flex flex-col">
                        <p>General Tips When Storing</p>
                        <p>boxy protection plan here</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col border border-gray-900 rounded-md p-1 ">
                    <h2 className="text-xl font-semibold mb-4">
                      Price: ${listing.price}
                    </h2>
                    <div className="grid grid-cols-2 grid-rows-2 divide-gray-400 border border-gray-400 rounded-md p-1 text-[12px]">
                      <div className=" border">
                        <label>Drop off Date:</label>
                        <input
                          type="date"
                          value={dropOffDate}
                          onChange={(e) => setDropOffDate(e.target.value)}
                        />
                      </div>
                      <div className=" border">
                        <label>Pick up Date:</label>
                        <input
                          type="date"
                          value={pickUpDate}
                          onChange={(e) => setPickUpDate(e.target.value)}
                        />
                      </div>
                      <div className="border">
                        <label>Access Dates:</label>
                        <input
                          type="date"
                          value={accessDate}
                          onChange={(e) => setAccessDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <p className="mt-4 text-xs">Total: $200</p>
                  </div>

                  <button
                    className="bg-[#097275] hover:bg-[#0a3739] transition:color h-[40px] w-full mb-7 ml-auto right-2 rounded-full text-white mt-1"
                    onClick={() =>
                      router.push({
                        pathname: `./${listingID}/reserve`,
                        query: { dropOffDate, pickUpDate, accessDate, listingID },
                      })
                    }
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const id = context.query.listingID;
  const res = await fetch(`http://localhost:3000/api/listings/${id}`);
  const listing = await res.json();

  // Fetch the host information (Need to implement get endpoint probs)
  const hostRes = await fetch(
    `http://localhost:3000/api/user/${listing.host_id}`
  );
  const host = await hostRes.json();
  console.log(host);
  return {
    props: { listing, host },
  };
}
