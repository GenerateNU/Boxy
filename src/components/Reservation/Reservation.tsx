import { randomInt } from "crypto";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";

export default function Reservation({reservation} : any) {
    
    const profile_images = ['https://i.imgur.com/v51cI9k.jpg', 'https://i.imgur.com/U6Q47KA.jpg', 'https://i.imgur.com/eDom8qI.png', 'https://i.imgur.com/9MK0P02.jpg', 'https://i.imgur.com/SFRf9az.jpg']

    useEffect(() => {
        fetch_reservation_information()
        fetch_user_information()
      }, reservation);
    
    const [listing, setListing] = useState({'name': '', 'address': ''});
    const [user, setUser] = useState({'name': ''});

    
    // Fetch resevation information: 
    async function fetch_reservation_information() {
        const listing_info = await (
            await fetch("http://localhost:3000/api/listings/" + reservation.listing_id, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
          ).json();
        
          setListing(listing_info)
    }  

    // Fetch resevation information: 
    async function fetch_user_information() {
        const user_info = await (
            await fetch("http://localhost:3000/api/user/" + reservation.stasher_id, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
          ).json();

          setUser(user_info)
    }  

    return (
          <div
            className="w-full hover:bg-bxBoxLight border-2 rounded-3xl h-[17.5vh] mb-5 grid grid-cols-2"
          >
            <div className="h-full flex items-center pl-10">
              <img className='h-[10vh] w-[10vh] object-cover rounded-full mr-5' src='https://i.imgur.com/tdi3NGa.png'></img>
              <div>
                <h3 className=''><b>{user?.name}</b></h3>
                <h3>{listing?.address}</h3>
              </div>
            </div>
            <div className="h-full flex items-center justify-end pr-7">
              <div className="w-[25%] rounded-lg flex bg-bxContrast items-center justify-center center mr-5">
                <h3 className="pr-2 pt-2 pb-2 pl-2 text-white">Reserved</h3>
              </div>
              <AiOutlineRight style={{ fontSize: "20px", color: "#B5B5B5" }} />
            </div>
          </div>
      );
}