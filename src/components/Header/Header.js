import React from 'react'
import icon from '../../assets/bytehashIcon.png'

export default function Header() {
  return (
    <header className="h-20 mt-2 px-5 flex items-center">
        <img className="h-full" src={icon} alt="icon"></img>
        <h1 className="mr-auto font-semibold justify-content-center text-3xl">byteHash</h1>
        <button className="bg-green-400 hover:bg-green-500 text-indigo-900 text-center font-bold py-2 px-4 rounded-xl">
          connect wallet
        </button>
    </header>
  )
}
