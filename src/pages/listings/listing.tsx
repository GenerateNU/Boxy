import { AiOutlineRight } from "react-icons/ai";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Listing({ listing }: any) {
  const [statusColor, setStatusColor] = useState("#00000");
  const [statusHover, setHoverStatus] = useState(false);
  const link = "/listings/" + listing.listing_id
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
  
  // Assuming that first and last in the list are the earliest and latest dates 
  const earlyDate = new Date(listing.dates_available[0])
  const lateDate = new Date(listing.dates_available[listing.dates_available.length - 1])
  const getEarliestDate = monthNames[earlyDate.getMonth()] + " " + earlyDate.getDate();
  const getLatestDate = monthNames[lateDate.getMonth()] + " " + lateDate.getDate();


  useEffect(() => {
    if (listing.price < 20) {
      setStatusColor("#E03C32");
    } else if (listing.price >= 20 && listing.price < 100) {
      setStatusColor("#FFD301");
    } else {
      setStatusColor("#7BB662");
    }
  }, [listing.price]);

  return (
    <Link href={link}>
      <div
        className="w-full bg-bxBoxLight hover:bg-[#e6e6e6] border border-[#e6e6e6] rounded-xl h-[13.5vh] mb-5 grid grid-cols-2"
        onMouseEnter={() => setHoverStatus(true)}
        onMouseLeave={() => setHoverStatus(false)}
      >
        <div className="h-full flex items-center pl-10">
          <h2>{listing.address}</h2>
        </div>
        <div className="h-full flex items-center justify-end pr-7">
          <div className="rounded-md flex bg-[#e6e6e6] items-center justify-evenly mr-5">
            <h3 className="pr-5 pt-2 pb-2 pl-2">{getEarliestDate} - {getLatestDate}</h3>
          </div>
          <AiOutlineRight style={{ fontSize: "25px", color: "#e6e6e6" }} />
        </div>
      </div>
    </Link>
  );
}
