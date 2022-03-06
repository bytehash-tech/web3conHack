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
        <a href="https://twitter.com/bytehash_tech" target="_blank" rel="noreferrer"
            className="hover:text-green-400 flex justify-center"
        >
            <span className="font-sans flex justify-center">
                <TwitterOutlined className="mr-4 flex text-center items-center" />@</span>
                byteHash
        </a>
    </footer>
  )
}
