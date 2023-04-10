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
      <div className="flex justify-center">
        <div className="flex flex-col pt-4 w-4/5">
          <section className="overflow-hidden text-neutral-700">
            <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
              <div className="flex">
                <div className="w-1/2 p-1 md:p-2">
                  <img
                    alt="gallery"
                    className="block h-full w-full rounded-lg object-cover object-center"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVKeqGoOAeda1gBkO1FwdKC4aLI7bOsAVnDw&usqp=CAU"
                  />
                </div>
                <div className="w-1/2">
                  <div className="flex flex-wrap">
                    <div className="w-1/2 p-1 md:p-2">
                      <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src="https://st.hzcdn.com/simgs/a881cb090fe2028b_4-3777/traditional-garage.jpg"
                      />
                    </div>
                    <div className="w-1/2 p-1 md:p-2">
                      <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src="https://insulationcart.com/image/kb/k003007_How-to-Optimise-a-Cold-Storage-Room2.jpg"
                      />
                    </div>
                    <div className="w-1/2 p-1 md:p-2">
                      <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src="data:image/jpeg;base64,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"
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
                          src="https://images.younghouselove.com/2010/12/NewEmpty-Living-Built-Ins.jpg"
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
                        src="https://insulationcart.com/image/kb/k003007_How-to-Optimise-a-Cold-Storage-Room2.jpg"
                      />
                      <img
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src="https://images.younghouselove.com/2010/12/NewEmpty-Living-Built-Ins.jpg"
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
              <div className="grid grid-cols-3 grid-rows-1 gap-4">
                <div className="flex flex-col p-4 gap-1 col-span-2">
                  <div className="flex flex-col border-b border-gray-300 p-2">
                    <h2 className="text-xl font-semibold mb-4">
                      {listing.space_available[0]} x{" "}
                      {listing.space_available[1]} ft {listing.space_type}
                    </h2>
                    <p>
                      {listing.city}, {listing.state}
                    </p>
                  </div>
                  <div className="flex flex-col border-b border-gray-300 p-2">
                    <p>{listing.description}</p>
                    <p>Description</p>
                  </div>
                  <div className="flex flex-col border-b border-gray-300 p-2">
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
                  <div className="flex flex-col border-b border-gray-300 p-2">
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
                  <div className="flex flex-col border-b border-gray-300 p-2">
                    <h2 className="text-xl font-semibold mb-4">Questions</h2>
                    <p>
                      Listing details and description go here. You can add more
                      content related to the listing, such as reviews, owner
                      information, etc.
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-300 p-2">
                    <div className="flex flex-row items-center">
                      <img
                        src={
                          "https://ih1.redbubble.net/image.1554216071.9881/st,small,845x845-pad,1000x1000,f8f8f8.jpg"
                        }
                        alt="Host profile"
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <p className="ml-2">Hosted by John Doe</p>
                    </div>

                    <div className="flex items-center">
                      <p className="font-semibold">{host.name}</p>
                      <button
                        className="hover:bg-gray-300 border border-stone-800 w-full m-8 p-4 rounded-full text-black"
                        onClick={toggleContactModal}
                      >
                        Contact
                      </button>
                    </div>
                  </div>

                  {isContactModalOpen && (
                    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">
                          Contact Host
                        </h2>
                        <p>
                          Email:{" johnDoe@gmail.com"}
                          <a href={`mailto:${host.email}`}>{host.email}</a>
                        </p>
                        <p>Phone: 631-899-2304{host.phone_number}</p>
                        <button
                          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                          onClick={toggleContactModal}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col border-b border-gray-300 p-2">
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
                  <div className="flex flex-col rounded-md p-1 border border-gray-400 p-4">
                    <h2 className="text-xl font-semibold mb-4">
                      Price: ${listing.price}
                    </h2>
                    <div className="grid grid-cols-2 grid-rows-2 gap-2 text-[12px]">
                      <div>
                        <label htmlFor="dropOffDate">Drop off Date:</label>
                        <div className="flex items-center justify-between rounded-md border bg-gray-100 p-2">
                          <span
                            onClick={() => {
                              const el = document.getElementById("dropOffDate");
                              if (el) el.click();
                            }}
                          >
                            Select
                          </span>
                          <input
                            id="dropOffDate"
                            type="date"
                            value={dropOffDate}
                            onChange={(e) => setDropOffDate(e.target.value)}
                            className="bg-gray-100"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="pickUpDate">Pick up Date:</label>
                        <div className="flex items-center justify-between rounded-md border bg-gray-100 p-2">
                          <span
                            onClick={() => {
                              const el = document.getElementById("pickUpDate");
                              if (el) el.click();
                            }}
                          >
                            Select
                          </span>
                          <input
                            id="pickUpDate"
                            type="date"
                            value={pickUpDate}
                            onChange={(e) => setPickUpDate(e.target.value)}
                            className="bg-gray-100"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="accessDate">Access Dates:</label>
                        <div className="flex items-center justify-between rounded-md border bg-gray-100 p-2">
                          <span
                            onClick={() => {
                              const el = document.getElementById("accessDate");
                              if (el) el.click();
                            }}
                          >
                            Select
                          </span>
                          <input
                            id="accessDate"
                            type="date"
                            value={accessDate}
                            onChange={(e) => setAccessDate(e.target.value)}
                            className="bg-gray-100"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-xs">Total: $200</p>
                  </div>

                  <button
                    className="bg-[#097275] hover:bg-[#0a3739] transition:color h-[40px] w-full mb-7 ml-auto right-2 rounded-full text-white mt-1"
                    onClick={() =>
                      router.push({
                        pathname: `./${listingID}/reserve`,
                        query: { dropOffDate, pickUpDate, accessDate },
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

  console.log(context.query.listingID);

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
