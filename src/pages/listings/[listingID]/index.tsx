import { useRouter } from "next/router";
import React from "react";

export default function ListingDetailsPage() {
  const router = useRouter();
  const { listingID } = router.query;

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
                        onClick={toggleModal}
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
              {isModalOpen && (
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
                      onClick={toggleModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="flex justify-center mt-1">
            <div className="w-4/5 p-4">
              <div className="grid grid-cols-3 grid-rows-4 gap-4">
                <div className="flex flex-col p-4 gap-1 col-span-2">
                  <div className="flex border-b border-gray-100 p-2">
                    <h2 className="text-xl font-semibold mb-4">Information</h2>
                    <p>
                      Listing details and description go here. You can add more
                      content related to the listing, such as reviews, owner
                      information, etc.
                    </p>
                  </div>
                  <div className="flex border-b border-gray-100 p-2">
                    <h2 className="text-xl font-semibold mb-4">Information</h2>
                    <p>
                      Listing details and description go here. You can add more
                      content related to the listing, such as reviews, owner
                      information, etc.
                    </p>
                  </div>
                  <div className="flex border-b border-gray-100 p-2">
                    <h2 className="text-xl font-semibold mb-4">Information</h2>
                    <p>
                      Listing details and description go here. You can add more
                      content related to the listing, such as reviews, owner
                      information, etc.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col border border-gray-900 rounded-md p-1">
                    <h2 className="text-xl font-semibold mb-4">Price</h2>
                    <p>Price: $100</p>
                    <div>
                      <label>Drop off Date:</label>
                      <input type="date" />
                    </div>
                    <div>
                      <label>Pick up Date:</label>
                      <input type="date" />
                    </div>
                    <div>
                      <label>Access Dates:</label>
                      <input type="date" />
                    </div>
                    <p>Total: $200</p>
                  </div>
                  <button
                    className="bg-[#7C7C7C] hover:bg-[#097275] transition:color h-[40px] w-full mb-7 ml-auto right-2 rounded-full text-white mt-1"
                    onClick={() => router.push(`./${listingID}/reserve`)}
                  >
                    Reserve
                  </button>
                </div>
                <div className="col-span-2">
                  <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                  <ul>
                    <li>Amenity 1</li>
                    <li>Amenity 2</li>
                    <li>Amenity 3</li>
                    {/* Add more amenities as needed */}
                  </ul>
                </div>
                <div className="col-span-2">
                  <h2 className="text-xl font-semibold mb-4">Questions</h2>
                </div>
                <div className="col-span-2">
                  <h2 className="text-xl font-semibold mb-4">
                    Hosted by Section
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
