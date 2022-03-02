import React, {useState, useEffect} from 'react'

export default function Main() {

    const [readFlag, setReadFlag] = useState(true)
    
    function onChange(){
        setReadFlag(prevState => !prevState)
    }

    return (
        <div>
            <div className="flex justify-center mt-16 py-2">
                <div className="xl:w-1/3">
                    <div className="input-group relative flex flex-auto items-stretch w-full mb-4 rounded">
                    <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-8 py-6 
                    text-base font-normal text-[#f8f9fb] bg-[#02104d] bg-clip-padding border
                    border-none rounded-l-xl transition ease-in-out m-0 focus:text-[#f8f9fb] focus:bg-[#02104d]
                    focus:border-blue-600 focus:outline-none placeholder:text-xs" 
                    placeholder="Search by Address / Txhash / Block / Token / Ens"/>
                    <span className="input-group-text flex items-center pr-8 py-1.5 text-base font-normal bg-[#02104d]
                    text-gray-700 text-center whitespace-nowrap rounded-r-xl">
                        <svg color="#42e276" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-10 my-4 mb-10">
                <p onClick={!readFlag ? onChange : ()=>{}} className={`${readFlag ? 'text-[#f8f9fb] cursor-pointer' : 'text-gray-400 cursor-pointer'}`}>Read Contracts</p>
                <p onClick={onChange} className={`${!readFlag ? 'text-[#f8f9fb] cursor-pointer' : 'text-gray-400 cursor-pointer'}`}>Write Contracts</p>
            </div>
            {readFlag &&
            <div className="mt-5 xl:w-1/3 mx-auto">
                {/* item 1 */}
                <div>
                    <p className="md:space-x-1 space-y-1 md:space-y-0 mb-4">
                    <a className="flex items-center w-full px-6 py-3  bg-[#051338] text-white font-medium text-xs leading-tight 
                    uppercase rounded-md shadow-md hover:shadow-lg border-2 border-[#1d2682]
                    text-left
                    focus:shadow-lg focus:outline-none focus:ring-0
                    active:shadow-lg transition duration-150 
                    ease-in-out" data-bs-toggle="collapse" 
                    href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                        1. Auction_drop_interval
                        <svg color="#1d2682" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                    </p>
                    <div className="collapse" id="collapseExample">
                    <div className="block p-6 rounded-lg shadow-lg ">
                        Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                    </div>
                    </div>
                </div>

                {/* item2 */}
                <div>
                    <p className="md:space-x-1 space-y-1 md:space-y-0 mb-4">
                    <a className="flex items-center w-full px-6 py-3  bg-[#051338] text-white font-medium text-xs leading-tight 
                    uppercase rounded-md shadow-md hover:shadow-lg border-2 border-[#1d2682]
                    text-left
                    focus:shadow-lg focus:outline-none focus:ring-0
                    active:shadow-lg transition duration-150 
                    ease-in-out" data-bs-toggle="collapse" 
                    href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample">
                        1. Auction_drop_interval
                        <svg color="#1d2682" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                    </p>
                    <div className="collapse" id="collapseExample1">
                    <div className="block p-6 rounded-lg shadow-lg ">
                        Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                    </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
