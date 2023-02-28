import { MouseEvent, useState } from "react";

export default function AmenitiesForm() {
    let amenitiesList = new Set<String>;
    const [buttonState, setButtonState] = useState("not_clicked")


    function updateAmenitiesList(placeholder: string) {
        if(placeholder in amenitiesList){
            amenitiesList.delete(placeholder)
        } else {
            amenitiesList.add(placeholder)
        }
    }

    
    const create_amenity = (placeholder:any , state: string) => {
        return(
            <button onClick = {() => [updateAmenitiesList(placeholder), setButtonState(state)]} className={buttonState === state ? "h-[9vh] w-[18vh] bg-[#F8F8F8]  hover:bg-gray-400 rounded-3xl mb-3 mr-3 " : "h-[9vh] w-[18vh] bg-gray-400  hover:bg-gray-400 rounded-3xl mb-3 mr-3"} >{placeholder}</button>
        )
    }
    
    return (
        <div className='container min-w-full flex flex-col items-center mt-[10vh]'>
            <div className="w-3/6 flex flex-col ">
                <h1 className='text-3xl pb-2 ml-3'>Amenities</h1>
                <h3 className='pb-5 ml-3'>Please list your amenities if applicable. Select all that apply.</h3>
                <div className = "grid gap-y-1 gap-x-20 grid-cols-3 ml-1 mt-1 ">
                    {create_amenity("Pest Controlled", "not_clicked")}
                    {create_amenity("Fire Alarm System", "not_clicked")}
                    {create_amenity("Smoke Free", "not_clicked")}
                    {create_amenity("Pet Free", "not_clicked")}
                    {create_amenity("Access to Elevator", "not_clicked")}
                    {create_amenity("Ground Floor", "not_clicked")}
                    {create_amenity("Climate Controlled", "not_clicked")}
                    {create_amenity("Private Storage", "not_clicked")}
                    {create_amenity("Party Free", "not_clicked")}
                    {create_amenity("Other", "not_clicked")}
                </div>
            </div>
        </div>
);}


// import { stringify } from "querystring";
// import { MouseEvent, use, useEffect, useState } from "react";

// export default function amenitiesListingPage() {
//     const [buttonState, setButtonState] = useState([])


//     const create_amenity = (placeholder:any , name: string) => {
//         const in_list = buttonState.includes(name)
//         console.log(buttonState)
//         console.log(in_list)
//         return(
//             <button className={!in_list ? "h-[9vh] w-[18vh] bg-bxBrand rounded-3xl mb-3 mr-3 " : "h-[9vh] w-[18vh] bg-bxContrast rounded-3xl mb-3 mr-3"} onClick = {() => updateAmenitiesList(name)}>{placeholder}</button>
//         )
//     }

//     const updateAmenitiesList = (name: string) => {
//         setButtonState((curButtonState: string[]) => {
//             curButtonState.push(name)
//             return curButtonState
//         })
//     }
    
//     return (
//         <div className='container min-w-full flex flex-col items-center mt-[10vh]'>
//             <div className="w-3/6 flex flex-col ">
//                 <h1 className='text-3xl pb-2 ml-3'>Amenities</h1>
//                 <h3 className='pb-5 ml-3'>Please list your amenities if applicable. Select all that apply.</h3>
//                     <div className = "grid gap-y-1 gap-x-20 grid-cols-3 ml-1 mt-1 ">
//                         {create_amenity("Pest Controlled", 'pc')}
//                         {create_amenity("Fire Alarm System", 'fas')}
//                         {create_amenity("Smoke Free", 'sf')}
//                         {create_amenity("Pet Free", 'pf')}
//                         {create_amenity("Access to Elevator", 'ate')}
//                         {create_amenity("Ground Floor", 'gf')}
//                         {create_amenity("Climate Controlled", 'cc')}
//                         {create_amenity("Private Storage", 'ps')}
//                         {create_amenity("Party Free", 'ptf')}
//                         {create_amenity("Other", 'o')}
//                     </div>
//                 </div>
//             <div className='absolute bottom-10 w-[80%]'>
//                 <div className="flex justify-between">
//                     <div className="">
//                         <button className="border border-black h-[5vh] w-[8.5vw] mb-7 right-2 rounded-3xl text-black">Back</button>
//                     </div>
//                     <div className="">
//                         <button className="bg-[#7C7C7C] h-[5vh] w-[8.5vw] mb-7 right-2 rounded-3xl text-white">Next</button>
//                     </div>
//                 </div>
//                 <div id="progress-bar" className="h-[6px] bg-bxBoxLight grid grid-cols-8">
//                     <div className="bg-[#B3B3B3]"></div>
//                     <div className="bg-[#B3B3B3]"></div>
//                     <div className="bg-[#B3B3B3]"></div>
//                 </div>
//             </div>
//         </div>
// );}



