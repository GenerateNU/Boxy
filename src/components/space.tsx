export default function spaceListingPage() {
    const create_space = (placeholder: string) => {
        return(
            <button className="h-[9vh] w-[18vh] bg-[#F8F8F8] hover:bg-gray-400 rounded-3xl mb-3 mr-3">{placeholder}</button>
            
        )
    }
    
    return (
        <div className='container min-w-full flex flex-col items-center mt-[10vh]'>
            <div className="w-3/6 flex flex-col">
                <h1 className='text-3xl pb-2'>Space Description</h1>
                <h3 className='pb-5'>Please Describe Your Storage Space. Check All That Apply.</h3>
                <div className = "grid gap-y-1 gap-x-20 grid-cols-3">
                    {create_space("Basement")}
                    {create_space("Closet")}
                    {create_space("Common Living Space")}
                    {create_space("Bedroom")}
                    {create_space("Cabinet")}
                    {create_space("Unoccupied Room")}
                    {create_space("Other")}
                </div>

            </div>
            <div className='absolute bottom-10 w-[80%]'>
            <div className="flex justify-between">
                    <div className="">
                        <button className="border border-black h-[5vh] w-[8vw] mb-7 right-2 rounded-full text-black hover:border-none hover:bg-gray-400">Back</button>
                    </div>
                    <div className="">
                        <button className="bg-[#7C7C7C] h-[6vh] w-[8vw] mb-7 right-2 rounded-full text-white hover:bg-gray-400">Next</button>
                    </div>
                </div>
                <div id="progress-bar" className="h-[6px] bg-bxBoxLight grid grid-cols-8">
                    <div className="bg-[#B3B3B3]"></div>
                    <div className="bg-[#B3B3B3]"></div>
                    <div className="bg-[#B3B3B3]"></div>
                    <div className="bg-[#B3B3B3]"></div>
                </div>
            </div>
        </div>
);}