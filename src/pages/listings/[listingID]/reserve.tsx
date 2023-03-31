import { useRouter } from "next/router";
import { useState } from 'react'
import { GetServerSidePropsContext } from "next";
import { AiOutlineLeft } from "react-icons/ai";
import DateForm from "@/components/Reservation/DateForm";
import ReservationOverview from "@/components/Reservation/ReservationOverview";
import DateRangeSelector from "../../../components/General/DateRangeSelector"
import dayjs, { Dayjs } from 'dayjs';
import time from 'console'

export default function ListingReservationPage({ listing }: any) {
  const listing_info = listing.message
  const router = useRouter();
  const [currentForm, setCurrentForm] = useState(0)
  const reservation_forms = [
    <DateForm listing={listing_info} />
  ]

  const reservation_overview = {
    'total': '$350',
    'address': listing_info.address,
    'city': listing_info.city,
    'state': listing_info.state,
    'protection': null,
    'items': null,
    'images': ['https://media.istockphoto.com/id/1277536141/photo/boxes-on-cart-in-storage-unit.jpg?s=612x612&w=0&k=20&c=xdX1e3fB70BgTJAjE_hgcLE1Iv5FgIwl1JR8pLfaXTE=', 'https://media.istockphoto.com/id/1299083810/photo/parcels-on-conveyor-belt-in-a-warehouse.jpg?b=1&s=170667a&w=0&k=20&c=gcKD93K_UvTRyb1zZ0OFAWOWjF9pvCpuxwjmk0k1kAQ=', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyKa0hZUeV-eaojVFwCHjyddlhBu4uTMLYVpfzDw1F&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKL4qtOMiGrsXZWG1RmH-CnqnuhN5V70PULnSYpGOF&s']
  }

  const reservation_header = (index: number, text: string) => {
    return (
      <h2 className={`text-[20px] md:text-[32px] ${currentForm == index ? 'text-black' : 'text-[#B5B5B5]'}`}>
       {text}
      </h2>
    )
  }

  return (
    <div className="container flex flex-col min-w-[80vw] pt-16 justify-center items-center">
      <div className='flex w-[80vw] items-center mt-7 mb-7'>
            <AiOutlineLeft style={{ fontSize: "10px", color: "" }}/>
            <button className='text-[15px] ml-2'>Back</button>
      </div>
      <div className='flex place-content-between w-[80vw]'>
        <div className='flex-col w-[60%]'>
          <div className="flex mb-5">
            {reservation_header(0, 'Reservation Dates')}
            <h2 className='text-[20px] md:text-[32px] text-[#B5B5B5]'>{'\xa0/\xa0'}</h2>
            {reservation_header(1, 'Item Information')}
            <h2 className='text-[20px] md:text-[32px] text-[#B5B5B5]'>{'\xa0/\xa0'}</h2>
            {reservation_header(2, 'Payment')}
          </div>
          {reservation_forms[currentForm]}
        </div>
        <div id="">
          {ReservationOverview(reservation_overview, currentForm, setCurrentForm)}
          {DateRangeSelector(listing_info.dates_available)}
        </div>
      </div>
    </div>
  );

  function sendReservationRequest() {
    // make call to endpoint then redirect to my reservations

    router.push("http://localhost:3000/reservations/mine");
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.query.listingID;
  return {
    props: {
      listing: await (
        await fetch("http://localhost:3000/api/listings/" + id)
      ).json(),
    },
  };
}
