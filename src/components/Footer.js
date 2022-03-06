import React from 'react'
import { TwitterOutlined } from "@ant-design/icons"

export default function Footer() {
  return (
    <footer className="flex justify-center backdrop-blur-md bg-[#060c3e]/30
    text-xl text-white text-center p-4
    fixed
    inset-x-0
    bottom-0
    ">
        <p className="mr-4">built with 💜 by </p>
        <TwitterOutlined className="mr-1 flex text-center items-center" />
        <a href="https://twitter.com/bytehash_tech" target="_blank" rel="noreferrer"
            className="font-sans hover:text-green-400 flex justify-center text-transparent bg-clip-text bg-gradient-to-br from-[#584AFA] to-[#49F56F]
            shadow-transparent"
        >@byteHash</a>
    </footer>
  )
}
