import { useCallback, useEffect, useRef, useState } from "react";
import Autocomplete from "react-google-autocomplete";

export function LocationAutocomplete(props: { setCoordinates: Function }) {
  const [someState, setSomeState] = useState(false);
  const onPlaceSelected = useRef(() => undefined);

  // "toggleState" assinged a new function everytime "someState" changes
  const toggleState = useCallback(() => {
    const newState = !someState;
    setSomeState(newState);
    console.log("new state is", newState);
  }, [someState]);

  // "onPlaceSelected" is assinged a new function everytime "toggleState" changes
  useEffect(() => {
    onPlaceSelected.current = (place) => {
      props.setCoordinates({
        latitude: place[0].geometry.location.lat(),
        longitude: place[0].geometry.location.lng(),
      });
      toggleState();
    };
  }, [toggleState]);

  return (
    <Autocomplete
      apiKey={process.env.GOOGLE_MAPS_API_KEY}
      options={{ types: [] }}
      // onPlaceSelected is not updated in subsequent renders
      onPlaceSelected={(...args) => onPlaceSelected.current(args)}
      className="h-[100%] w-[60vw] md:w-[70vw] lg:w-[33vw] pl-5 border-[2px] border-[#B5B5B5] rounded-lg"
    />
  );
}
