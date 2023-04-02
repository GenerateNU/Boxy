import { BiPencil } from "react-icons/bi";

export default function DateForm(props: any) {
    return (
        <div className='container flex flex-col'>
            <h2 className='text-[25px] mb-2'>Dates</h2>
            <div className='flex mb-2'>
                <h4 className='text-[10px] md:text-[15px] mr-5'>Storage: Jan 1, 2023 - Aug 1, 2023</h4>
                <button onClick={() => props.setDateEdit(true)}>
                    <BiPencil size={20}/>
                </button>
            </div>
            <h4 className='text-[10px] md:text-[15px] mb-5'>Access Dates: None</h4>
            <hr className='w-[100%] h-[0.75px] bg-[#B5B5B5] border-0'></hr>
            <h2 className='text-[25px] mb-2 mt-5'>Pricing</h2>
            <div className='w-[100%] flex place-content-between mb-2'>
                <h4 className='text-[10px] md:text-[15px]'>${props.price}/month &#x2022; 7 months</h4>
                <h4 className='text-[10px] md:text-[15px]'>$350</h4>
            </div>
            <div className='w-[100%] flex place-content-between mb-2'>
                <h4 className='text-[10px] md:text-[15px]'>Fees</h4>
                <h4 className='text-[10px] md:text-[15px]'>$?</h4>
            </div>
            <div className='w-[100%] flex place-content-between mb-2'>
                <h4 className='text-[10px] md:text-[15px]'>Total:</h4>
                <h4 className='text-[10px] md:text-[15px]'>$350</h4>
            </div>
        </div>
    )
}