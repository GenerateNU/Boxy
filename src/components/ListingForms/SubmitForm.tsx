import { useState } from "react";
import { BiPencil } from "react-icons/bi";

export type SubmitFormProps = {
    address: any;
    datesAvailable: any;
    amenities: string;
    spaceDescription: string;
    itemDescription: string;
    sizeDescription: string;
    images: string[];
    identification: string;
    onEdit: (formName: string) => void;
}

export function SubmitForm({
    address,
    datesAvailable,
    amenities,
    spaceDescription,
    itemDescription,
    sizeDescription,
    images,
    identification,
    onEdit,
  }: SubmitFormProps) {
    const [editingForm, setEditingForm] = useState("");
  
    const info_grid = (category: string, formName: string, info: any) => {
      const handleClick = (formName: string) => {
        //go back to one of the forms
        setEditingForm(formName);
        onEdit(formName);
      };
      return (
        <div className="grid grid-cols-2 w-full place-content-between gap-4 rounded-md bg-[#F8F8F8]">
          <div className=" font-Satoshi p-1"> {category} </div>
          <div className="flex justify-end p-1">
            <button onClick={() => handleClick(formName)}>
              <BiPencil size={20} />
            </button>
          </div>
          <div className="text-sm p-1 font-thin col-span-2"> {info}</div>
        </div>
      );
    };
  
    return (
      <div className="w-1/2 flex justify-center">
        <div className="container h-full font-Inter mb-2">
          <div className="h-6 text-3xl mb-6">Review Responses</div>
          <div className="flex flex-col justify-between items-center gap-1">
            {info_grid("Address", "address", address)}
            {info_grid("Dates", "dates", datesAvailable)}
            {info_grid("Amentities", "amentities", amenities)}
            {info_grid(
              "Storage Space Description",
              "NEEDTOCHANGE",
              spaceDescription
            )}
            {info_grid("Item Description", "NEEDTOCHANGE", itemDescription)}
            {info_grid("Size Description", "NEEDTOCHANGE", sizeDescription)}
            {info_grid("Images", "NEEDTOCHANGE", images)}
            {info_grid("Identification", "NEEDTOCHANGE", identification)}
          </div>
        </div>
      </div>
    );
  }