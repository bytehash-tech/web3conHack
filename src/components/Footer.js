import React from 'react'

export default function Footer() {
  return (
    <footer className="flex justify-center backdrop-blur-md bg-[#060c3e]/30
    text-xl text-white text-center
    fixed
    inset-x-0
    bottom-0
    ">
        <p className="mr-4">built with 💜 by </p>
        <a href="https://twitter.com/bytehash_tech" target="_blank" rel="noreferrer"
            className="hover:text-green-400 font-sans text-transparent bg-clip-text bg-gradient-to-br from-[#584AFA] to-[#49F56F] shadow-transparent"
        >@byteHash
        </a>
    </footer>
  )
}
