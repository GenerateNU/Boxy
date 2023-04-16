import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import arrowIcon from "../assets/BoxyArrowIcon.png";
import { signIn, useSession } from "next-auth/react";
import { Coordinate } from "./_app";
import Workflow from "@/components/LandingPage/Workflow";
import { LocationSearchBar } from "@/components/Browse/LocationSearchBar";

type LocationSuggestion = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
};

export default function LandingPage(props: any) {
  const session = useSession();
  function setUniversalLocationState(coordinates: Coordinate) {
    props.setLocation(coordinates);
  }

  function service(image: string, title: string, text: string) {
    return (
      <div className="flex flex-col items-center mr-[4vw] ml-[4vw]">
        <img className="w-[25vw] h-[12.5vw] rounded-md" src={image} />
        <h2 className="text-[25px] mt-7">{title}</h2>
        <h3 className="text-center w-[20vw]">{text}</h3>
      </div>
    );
  }

  function button(text: string) {
    return (
      <button className="h-[60px] w-[20vw] lg:w-[11vw] ml-5 bg-bxBrand text-white rounded-3xl hover:bg-bxBrandLight transition ease-in duration-75">
        {text}
      </button>
    );
  }

  const { ref, inView } = useInView();
  const animation = useAnimation();
  const [loaded, setLoad] = useState(false);

  useEffect(() => {
    console.log(inView);
    if (inView) {
      setLoad(true);
      animation.start({
        opacity: 1,
        transition: {
          type: "tween",
          duration: 0.5,
        },
      });
    } else {
      animation.start({
        opacity: 0,
      });
    }
  }, [inView]);

  function getSearchResultsUrl(): string {
    return `/listings/browse?latitude=${encodeURIComponent(
      props.location.latitude
    )}&longitude=${encodeURIComponent(props.location.longitude)}&proximity=15`;
  }

  async function getLocationSuggestions(locationSearchInput: string) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${locationSearchInput}&addressdetails=1&countrycodes=us&limit=5`
    );
    const data = await response.json();

    setLocationSearchSuggestions(data);
  }

  return (
    <div className="container min-w-[100vw]">
      <div
        id="search"
        className="flex justify-center items-center w-[100vw] h-[70vh]"
      >
        <div className="relative flex flex-col items-center pt-8 pr-0 w-[100vw] md:w-auto lg:pr-12 md:items-start">
          <h1 className="text-[60px] md:text-[75px]">Stashing with Boxy</h1>
          <h3 className="text-[15px] md:text-[20px]">
            Boxy makes it easy to find convenient, local storage.
          </h3>
          <div className="flex pt-5 h-[80px]">
            <LocationSearchBar
              setCoordinates={setUniversalLocationState}
            ></LocationSearchBar>
            <a href={getSearchResultsUrl()}>
              {button("Find Storage", "11vw", "20vw")}
            </a>
          </div>
        </div>
        <div className="pt-8 w-0 lg:w-[34.5vw] h-[38vh] invisible lg:visible">
          <div className="absolute w-[33vw] h-[35vh] ml-[1.5vw] mt-[1.5vw] rounded-xl bg-bxBrand invisible lg:visible" />
          <img
            className="absolute w-[33vw] h-[35vh] object-cover rounded-xl invisible lg:visible"
            src="https://static.wixstatic.com/media/fbf970_b070ca63b7a04350bc9939ca0e0eeb77~mv2.jpg/v1/fill/w_2880,h_1362,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/fbf970_b070ca63b7a04350bc9939ca0e0eeb77~mv2.jpg"
          />
        </div>
      </div>
      <div
        id="function"
        className="flex flex-col min-w-fill h-[70vh] bg-[#F8F8F8] items-center justify-center"
      >
        <h2 className="text-[25px] mb-10">How it Works</h2>
        <div className="flex">
          <Workflow
            image="https://i.imgur.com/ivuYU3E.jpg"
            text="Request a storage reservation through Boxy."
            arrow={true}
          ></Workflow>
          <Workflow
            image="https://i.imgur.com/ivuYU3E.jpg"
            text="Get approval from your host to confirm the reservation."
            arrow={true}
          ></Workflow>
          <Workflow
            image="https://i.imgur.com/ivuYU3E.jpg"
            text="Bring your belongings to the storage location on your drop-off day."
            arrow={true}
          ></Workflow>
          <Workflow
            image="https://i.imgur.com/ivuYU3E.jpg"
            text="Pick up your belongings on your pick-up day. Storage successful!"
            arrow={false}
          ></Workflow>
        </div>
      </div>
      <div
        ref={ref}
        id="service"
        className={
          inView || loaded
            ? "flex flex-col min-w-full h-[80vh] items-center justify-center opacity-100 transition ease-in duration-500"
            : "opacity-0"
        }
      >
        <h2 className="text-[25px] mb-10">Our Services</h2>
        <div className="flex mb-10">
          {service(
            "https://i.imgur.com/ivuYU3E.jpg",
            "Stashing",
            "Stash your belongings through Boxy to find convenient, local spaces. Easily search for storage spaces near your and request a reservation to start the process!"
          )}
          {service(
            "https://i.imgur.com/ivuYU3E.jpg",
            "Hosting",
            "Register as a host to turn your empty spaces into passive income. Boxy enables you to rent out these spaces for others to stash in."
          )}
        </div>
        {session.status === "unauthenticated" ? (
          <div onClick={signIn} href={"/user/register"}>
            {button("Sign up now", "11vw", "20vw")}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
