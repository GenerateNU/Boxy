import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  const { data, status } = useSession();
  const [navState, setNavState] = useState("");

  const nav_bar_button = (state: string, text: any) => {
    const handleClick = (state: string) => {
      setNavState(state);
      if (state == "userIcon") {
        if (status === "unauthenticated") {
          signIn();
        } else {
          router.push("http://localhost:3000/user/account");
        }
      } else if (state == "sign out") {
        signOut();
        alert("signed out");
      }
    };

    return (
      <button
        onClick={() => handleClick(state)}
        className={
          navState == state
            ? "flex justify-center text-black"
            : "flex justify-center hover:text-black"
        }
      >
        {text}
      </button>
    );
  };

  return (
    <div>
      <nav className="container fixed min-w-full h-16 border-b-2 border-gray bg-white shadow-md z-50">
        <div className="flex justify-between items-center container mx-auto h-full ">
          <Link
            href={"http://localhost:3000/"}
            className="text-center font-Inter font-semibold text-xl text-[#097275]"
          >
            BOXY
          </Link>
          <div className="flex items-center gap-10 text-[#C4C4C4]">
            {nav_bar_button(
              "browse",
              <Link href="http://localhost:3000/listings/browse">Browse</Link>
            )}
            {nav_bar_button(
              "myListings",
              <Link href="http://localhost:3000/listings/mine">My Listings</Link>
            )}
            {nav_bar_button(
              "myListings",
              <Link href="http://localhost:3000/reservations/mine">My Reservations</Link>
            )}
            {nav_bar_button(
              "createListing",
              <Link href="http://localhost:3000/listings/create">
                Create Listing
              </Link>
            )}
            {nav_bar_button("userIcon", <BiUserCircle size={30} />)}
            {status === "authenticated" &&
              nav_bar_button("sign out", "sign out")}
          </div>
        </div>
      </nav>
    </div>
  );
}
