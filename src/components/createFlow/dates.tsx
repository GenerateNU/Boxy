import { useState } from "react";
export default function CreateListingsPage() {
    const [dateState, useDateState] = useState('start')
    
    const date_button = (name: string, state: string) => {
        return (
            <button onClick={() => useDateState(state)} className={dateState==state ? 'bg-[#B3B3B3] rounded-3xl' : 'rounded-3xl'}>
                {name}
            </button>
        )
    }
    const create_input = (placeholder: string, type: string) => {
        return(
            <input className='h-[7.5vh] pl-5 pr-5 bg-bxBoxLight rounded-3xl mb-3 placeholder-[#B3B3B3]' type={type}></input>
        )
    }
    return(
        <div className="container min-w-full flex flex-col items-center mt-[10vh]">
            <div className="w-2/6 flex flex-col">
                <h1 className="text-3xl mb-2">Dates</h1>
                <h3 className='mb-5'>Please provide the Start Date and End Date for location availability.</h3>
                <div className="grid grid-cols-2 mb-5 h-[7.5vh] bg-[#D9D9D9] rounded-3xl">
                    {date_button("Start", "start")}
                    {date_button("End", "end")}
                </div>
                {create_input("MM / DD / YY", 'date')}
                {create_input("___ : ___", 'time')}
            </div>
        </div>
);}