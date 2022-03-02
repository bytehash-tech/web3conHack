import { React } from 'react'
import icon from '../../assets/bytehashIcon.png'
import ConnectButton from './Button'
import { ethers } from 'ethers'

export default function Header() {
  const getProvider = () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      return provider
    } catch (error) {
      console.log('missing provider')
    }
  }

  if (getProvider()) {
    return (
      <header className="h-20 mt-2 px-5 flex items-center">
        <img className="h-full" src={icon} alt="icon"></img>
        <h1 className="mr-auto font-semibold justify-content-center text-3xl">
          byteHash
        </h1>
        <ConnectButton />
      </header>
    )
  } else {
    return (
      <header>
        <h1>Please install metamask</h1>
      </header>
    )
  }
}
