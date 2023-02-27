import Link from "next/link";

export default function BrowseListingsPage({ listings }: any) {
  const display_listing = (
    description: string,
    cost: string,
    location: string,
    image: string
  ) => {
    return (
      <div className="flex flex-col border border-grey-500">
        <div className="flex justify-center">
          <img
            className="object-cover w-full h-56 rounded-lg mt-2 ml-2 mr-2"
            src={image}
            alt=""
          ></img>
        </div>
        <div className="flex flex-col justify-between ml-2 mb-2 mt-2">
          <div className="flex flex-row">
            <div className="flex flex-row w-full justify-left">
              <span className="text-sm font-sm text-black hover:underline hover:font-semibold dark:text-white cursor-pointer">
                {description}
              </span>
            </div>
            <div className="flex flex-row w-full justify-end mr-2">
              <span className="text-sm text-black dark:text-black">{cost}</span>
            </div>
          </div>
          <span className="text-sm text-black dark:text-black">{location}</span>
        </div>
      </div>
    );
  };

  <Link href="/results" />;
  return (
    <div className="flex flex-col mt-5">
      <div className="container mx-auto">
        <div className="flex flex-row mb-4">
          <div className="flex justify-start w-full">
            <input
              type="text"
              className="w-[50vw] rounded-lg border border-gray-400 p-2 text-black"
              placeholder="Search"
            />
          </div>
          <div className="flex justify-end w-[10vw]">
            <button className="ml-2 rounded-lg bg-white p-2 text-black hover:bg-gray-600 hover:text-white border border-black">
              Filter
            </button>
          </div>
        </div>
      </div>
      <section className="bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-2 mt-2 md:mt-4 md:grid-cols-4 mb-4">
            {listings.map((listing: any) => {
              {
                return display_listing(
                  listing.name,
                  listing.price,
                  listing.proximity,
                  ""
                );
              }
            })}
            {/* {display_listing(
              "5 x 5 Closet",
              "$50/month",
              "Boston, MA",
              "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            )}
            {display_listing(
              "5 x 5 Closet",
              "$50/month",
              "Boston, MA",
              "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            )}
            {display_listing(
              "5 x 5 Closet",
              "$50/month",
              "Boston, MA",
              "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            )}
            {display_listing(
              "5 x 5 Closet",
              "$50/month",
              "Boston, MA",
              "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            )}
            {display_listing(
              "5 x 5 Closet",
              "$50/month",
              "Boston, MA",
              "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            )}
            {display_listing(
              "5 x 5 Closet",
              "$50/month",
              "Boston, MA",
              "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            )}
            {display_listing(
              "5 x 5 Closet",
              "$50/month",
              "Boston, MA",
              "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            )}
            {display_listing(
              "5 x 5 Closet",
              "$50/month",
              "Boston, MA",
              "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            )} */}
          </div>
        </div>
      </section>
      <div className="flex justify-center">
        <button className="w-[20vw] ml-2 rounded-full bg-gray-500 p-2 text-white hover:bg-gray-600 hover:text-white">
          Show More
        </button>
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
