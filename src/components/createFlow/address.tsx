export default function addressListingPage(props : any) {

    const create_input = (placeholder: string) => { 
        return(
            <input onChange ={(event) => props.updateListingAttribute(placeholder, event.target.value)} className='h-[7.5vh] pl-5 bg-bxBoxLight rounded-3xl mb-3' placeholder={placeholder}></input>
        )
    }

    return (
        <div className='container min-w-full flex flex-col items-center mt-[10vh] '>
            <div className="w-3/6 flex flex-col ">
                <h1 className='text-3xl pb-2'>Address</h1>
                <h3 className='pb-5'>Please provide the Storage Host full address.</h3>
                {create_input("Street Address")}
                {create_input("Apt, Suite, Building Number (Optional)")}
                {create_input("City")}
                {create_input("Postal Code")}
                <h3 className="pt-5 pb-5">Enter a name for this Listing.</h3>
                {create_input("Name")}
            </div>
            <div className='absolute bottom-10 w-[80%]'>
                <div className="flex justify-between">
                    <div className="">
                        <button className="border border-solid border-black h-[5vh] w-[8vw] mb-7 right-2 rounded-full text-black">Back</button>
                    </div>
                    <div className="">
                        <button className="bg-[#7C7C7C] h-[5vh] w-[8vw] mb-7 right-2 rounded-full text-white">Next</button>
                    </div>
                </div>
                <div id="progress-bar" className="h-[6px] bg-bxBoxLight grid grid-cols-8">
                    <div className="bg-[#B3B3B3]"></div>
                </div>
            </div>
        </div>
);}