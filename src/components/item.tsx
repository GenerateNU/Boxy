export default function itemListingPage() {
    const create_item = (placeholder: string) => {
        return(
            <button className="h-[9vh] w-[18vh] bg-[#F8F8F8] hover:bg-gray-400 rounded-3xl mb-3 mr-3">{placeholder}</button>
        )
    }
    
    return (
        <div className='container min-w-full flex flex-col items-center mt-[10vh]'>
            <div className="w-3/6 flex flex-col">
                <h1 className='text-3xl pb-2'>Item and Size Description</h1>
                <h3 className='mb-5'>Please Describe The Type of Items You are Able to Store. Select all that apply.</h3>
                <div className = "grid gap-y-1 gap-x-20 grid-cols-3">
                    {create_item("Boxes Only")}
                    {create_item("Furniture Only")}
                    {create_item("Boxes and Furnitures")}
                    {create_item("Other")}
                </div>
                <h3 className="mt-5 mb-5">To the best of your ability, please describe the size of the storage space (e.g. Basement, 500 sqft of empty space with 8 ft ceilings). </h3>
                <textarea className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-black "></textarea>

            </div>
            
            <div className='absolute bottom-10 w-[80%]'>
                <div className="flex justify-between">
                    <div className="">
                        <button className="borderborder-black h-[5vh] w-[8vw] mb-7 right-2 rounded-full text-black">Back</button>
                    </div>
                    <div className="">
                        <button className="bg-[#7C7C7C] h-[5vh] w-[8vw] mb-7 right-2 rounded-full text-white">Next</button>
                    </div>
                </div>
                
                <div id="progress-bar" className="h-[6px] bg-bxBoxLight grid grid-cols-8">
                    <div className="bg-[#B3B3B3]"></div>
                    <div className="bg-[#B3B3B3]"></div>
                    <div className="bg-[#B3B3B3]"></div>
                    <div className="bg-[#B3B3B3]"></div>
                    <div className="bg-[#B3B3B3]"></div>
                </div>
            </div>
        </div>
);}