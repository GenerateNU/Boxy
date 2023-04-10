import { button } from "../General/GeneralComponents";

export default function ReservationOverview(
  reservation: any,
  currentForm: number,
  setCurrentForm: Function,
  confirmReservation: Function
) {
  return (
    <div className="flex flex-col justify-center">
      <div className="border-[#B5B5B5] border-[0.75px] rounded-md p-[26px]">
        <div className="w-[100%] flex place-content-between mb-3">
          <h2 className="text-[25px]">Total</h2>
          <h2 className="text-[25px]">{reservation.total}</h2>
        </div>
        <hr className="w-[100%] h-[0.75px] bg-[#B5B5B5] border-0" />
        <div className="w-[100%] flex place-content-between mb-3 mt-3">
          <h4 className="text-[10px] md:text-[15px]">Location</h4>
          <div className="flex flex-col text-right">
            <h4 className="text-[10px] md:text-[15px]">
              {reservation.address}
            </h4>
            <h4 className="text-[10px] md:text-[15px]">
              {reservation.city + ", " + reservation.state}
            </h4>
          </div>
        </div>
        <hr className="w-[100%] h-[0.75px] bg-[#B5B5B5] border-0" />
        <div className="w-[100%] flex place-content-between mb-3 mt-3">
          <h4 className="text-[10px] md:text-[15px]">Dates</h4>
          <h4 className="text-[10px] md:text-[15px]">Jan 1 - Aug 1 2023</h4>
        </div>
        {reservation.protection != null ? (
          <>
            <hr className="w-[100%] h-[0.75px] bg-[#B5B5B5] border-0" />
            <div className="w-[100%] flex place-content-between mb-3 mt-3">
              <h4 className="text-[10px] md:text-[15px]">Protection Plan</h4>
              <h4 className="text-[10px] md:text-[15px]">
                {reservation.protection ? "Yes" : "No"}
              </h4>
            </div>
          </>
        ) : (
          <></>
        )}
        {reservation.items != null ? (
          <>
            <h4 className="text-[10px] md:text-[15px]">Storage Items</h4>
            <h4 className="text-[10px] md:text-[15px] text-[#B5B5B5] mb-3">
              {reservation.items}
            </h4>
          </>
        ) : (
          <></>
        )}
        {reservation.images != null && reservation.images.length != 0 ? (
          <>
            <h4 className="text-[10px] md:text-[15px] mb-3">Item Images</h4>
            <div className="grid grid-cols-3 gap-2">
              {reservation.images.map((image: string) => {
                return (
                  <img
                    className="object-cover w-[7.5vw] h-[7.5vw]"
                    src={image}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <button
        onClick={() =>
          currentForm !== 2
            ? setCurrentForm(currentForm + 1)
            : confirmReservation()
        }
        className={`h-[60px] w-[25vw] lg:w-[25vw] mt-5 bg-bxBrand text-white rounded-full hover:bg-bxBrandLight transition ease-in duration-75`}
      >
        {currentForm === 2 ? "confirm reservation" : "continue"}
      </button>
    </div>
  );
}

function requestReservation() {
  // ping add reservaiton endpoint with request details
}