
export default function ItemsForm() {
    const create_item = (placeholder: string) => {
        return(
            <button className="h-[80px] w-[100%] bg-[#F8F8F8] hover:bg-gray-400 rounded-md">{placeholder}</button>
        )
    }
    
    return (
        <div className='container min-w-full flex flex-col items-center pt-[5vh]'>
            <div className="w-3/6 flex flex-col">
                <h1 className='text-3xl pb-2'>Item and Size Description</h1>
                <h3 className='mb-5'>Please Describe The Type of Items You are Able to Store. Select all that apply.</h3>
                <div className = "grid gap-y-5 gap-x-5 grid-cols-3">
                    {create_item("Boxes Only")}
                    {create_item("Furniture Only")}
                    {create_item("Boxes and Furnitures")}
                    {create_item("Other")}
                </div>
                <h3 className="mt-5 mb-5">To the best of your ability, please describe the size of the storage space (e.g. Basement, 500 sqft of empty space with 8 ft ceilings). </h3>
                <textarea className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-black "></textarea>
            </div>
        </div>
);}