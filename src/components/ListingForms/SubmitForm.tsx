import { BiPencil } from "react-icons/bi";

  // const formLabels = [
  //   "Address",
  //   "Dates",
  //   "Amenities",
  //   "Storage Space Description",
  //   "Item Description",
  //   "Size Description",
  //   "Images",
  //   "Identification",
  // ];

export default function SubmitForm({
  fields,
  changeForm,
}: {
  fields: any;
  changeForm: Function;
}) {
  
  const formLabelsTemp = [
    "Address",
    "Dates",
    "Amenities",
    "Storage Space Description",
    "Item Description",
  ];

  return (
    <div className="w-1/2 flex justify-center">
      <div className="container h-full font-Inter mb-2">
        <div className="h-6 text-3xl mb-6">Review Responses</div>
        <div className="flex flex-col justify-between items-center gap-1">
          {formLabelsTemp.map((label, i) => {
            return (
              <div className="grid grid-cols-2 w-full place-content-between gap-4 rounded-md bg-[#F8F8F8] items-center" key={i}>
                <div className=" font-Satoshi p-1"> {label} </div>
                <div className="flex justify-end p-1">
                  <button onClick={() => changeForm(i)}>
                    <BiPencil size={20} />
                  </button>
                </div>
                <div className="text-sm p-1 font-thin col-span-2"> {fields[i]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="w-1/2 flex justify-center">
  //     <div className="container h-full font-Inter mb-2">
  //       <div className="h-6 text-3xl mb-6">Review Responses</div>
  //       <div className="flex flex-col justify-between items-center gap-1">
  //         {info_grid("Address", "address", address)}
  //         {info_grid("Dates", "dates", datesAvailable)}
  //         {info_grid("Amentities", "amentities", amenities)}
  //         {info_grid(
  //           "Storage Space Description",
  //           "NEEDTOCHANGE",
  //           spaceDescription
  //         )}
  //         {info_grid("Item Description", "NEEDTOCHANGE", itemDescription)}
  //         {info_grid("Size Description", "NEEDTOCHANGE", sizeDescription)}
  //         {info_grid("Images", "NEEDTOCHANGE", images)}
  //         {info_grid("Identification", "NEEDTOCHANGE", identification)}
  //       </div>
  //     </div>
  //   </div>
  // );
}
