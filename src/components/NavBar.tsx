import { useState } from "react";
import {BiUserCircle} from 'react-icons/bi'


export default function NavBar() {

    const nav_bar_button = (state: string, text: any) => {
      const [navState, setNavState] = useState("");
    
      const handleClick = (state: string) => {
        setNavState(state);
        if(state=="browse")
                   window.location.replace("http://localhost:3000/browse");
               else if(state=="reservations")
                   window.location.replace("http://localhost:3000/reservations");
               else if(state=="myListings")
                   window.location.replace("http://localhost:3000/listings");
            else if(state=="userIcon")
            window.location.replace("http://localhost:3000/account");
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
        <nav className="relative container min-w-full h-16 border-b-2 border-gray">
          <div className="flex justify-between items-center container mx-auto h-full ">
            <div className="text-center font-Inter font-semibold text-xl text-[#097275]">
              BOXY
            </div>
            <div className="flex items-center gap-10 text-[#C4C4C4]">
              {nav_bar_button("browse", "Browse")}
              {nav_bar_button("reservations", "Reservations")}
              {nav_bar_button("myListings", "My Listings")}
              {nav_bar_button("userIcon", <BiUserCircle size={30}/>)}
            </div>
          </div>
        </nav>
      </div>
    );
  }