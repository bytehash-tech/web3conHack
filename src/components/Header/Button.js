import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

function ConnectButton() {
  const [address, setAddress] = useState('')

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  const connectWalletHandler = async () => {
    await provider.send('eth_requestAccounts')
    const loadedAddress = await signer.getAddress()
    setAddress(loadedAddress)
  }

  useEffect(() => {
    signer.getAddress().then((currentAddress) => setAddress(currentAddress))
  }, [address])

  const isConnected = () => {
    if (address !== '') {
      return true
    }
    return false
  }

  if (isConnected() === true) {
    return (
      <button
        className="bg-green-400 hover:bg-green-500 text-indigo-900 text-center font-bold py-2 px-4 rounded-xl"
        type="button"
      >
        {address}
      </button>
    )
  } else {
    return (
      <button
        className="bg-green-400 hover:bg-green-500 text-indigo-900 text-center font-bold py-2 px-4 rounded-xl"
        type="button"
        onClick={connectWalletHandler}
      >
        connect wallet
      </button>
    )
  }
}

export default ConnectButton
