import { useState } from "react";

export default function HostPage() {
  const host_tab = (state: string, text: string) => {
    const [tabState, setTabState] = useState("upcoming");
    return (
      <button
        onClick={() => setTabState(state)}
        className={
          tabState == state
            ? "flex justify-center border-b-2 border-b-black"
            : "flex justify-center border-b-2"
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
          <div className="flex items-center">
            <button className="bg-white rounded-lg hover:bg-slate-400 my-2 mx-1">
              Browse
            </button>
            <button className="bg-white rounded-lg my-2 mx-1">
              Reservations
            </button>
            <button className="bg-white rounded-lg my-2 mx-1">
              My Listings
            </button>
            <button className="bg-white rounded-lg my-2 mx-1">USERIMG</button>
          </div>
        </div>
      </nav>

      <div className="container flex justify-center min-w-full pt-20">
        <div className="w-[50vw] flex-col">
          <div className="grid grid-cols-4 w-4/6 h-[7vh] mb-5">
            {host_tab("upcoming", "Upcoming")}
            {host_tab("ongoing", "Ongoing")}
            {host_tab("past", "Past")}
            {host_tab("request", "Requests")}
          </div>
        </div>
      </div>
    </div>
  );
}
