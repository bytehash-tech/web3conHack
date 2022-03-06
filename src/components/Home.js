import React from 'react'
import { ArrowRightOutlined } from "@ant-design/icons"

export default function Home(props) {

  return (
      <div className="flex justify-center p-10 mb-0">
        <div className="w-4/5 p-4 flex-col justify-center">
            <h1 className="md:text-7xl xl-text-8xl text-5xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#584AFA] to-[#49F56F]">
            Interaction With <span className="bg-clip-text bg-gradient-to-br from-pink-700 to-purple-700">Smart Contracts</span> Made Easy
            </h1>
            {/* <h2 className="mt-6 p-4 text-2xl font-bold text-[#8d5fc9]
                shadow-transparent rounded-xl bg-green-400 bg-opacity-10">
                Blockchain agnostic user interface to test/trigger smart contract functions
            </h2> */}
            {/* <div className="flex justify-center">
                <button className="rounded-md mt-10 w-1/4 p-3 bg-gradient-to-r 
                from-[#6D39DA] to-[#4C249F] hover:bg-gradient-to-r 
                hover:from-[#5c31b9] hover:to-[#3b1c7a] text-base flex justify-center items-center "
                    onClick={props.onChange}
                >
                    <p>Lets Start</p>
                    <ArrowRightOutlined className="ml-2" />
                </button>
            </div> */}
            
        </div>
      </div>
    
  )
}
