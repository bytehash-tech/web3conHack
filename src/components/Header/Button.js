import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { SelectOutlined, CloseOutlined } from "@ant-design/icons"

function ConnectButton() {
  const [address, setAddress] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const popUpHandler = () => {
    setIsModalVisible(true)
  }

  const onCancel = () => {
    setIsModalVisible(false)
  }

  const isConnected = () => {
    if (address !== '') {
      return true
    }
    return false
  }

  if (isConnected() === true) {
    return (
      <div>
        <button
          className="bg-green-400 hover:bg-green-500 text-indigo-900 text-center font-bold py-2 px-4 rounded-xl"
          type="button"
          onClick={popUpHandler}
        >
          {address.substring(0,6)}...
        </button>
        { isModalVisible &&
        <div className='backdrop-filter z-10 backdrop-blur-sm absolute inset-0
                        flex justify-center items-center text-left'>
          
          <div className="bg-[#4c249f] p-6 w-2/4 rounded-xl md:w-1/2">
            <div className="flex">
              <h1 className="font-semibold uppercase text-lg pb-3">Account Address</h1>
              <CloseOutlined onClick={onCancel} className="ml-auto" />
            </div>
            
            <div className="flex flex-col">
              <a
                href={`https://etherscan.io/address/${address}`}
                target="_blank"
                rel="noreferrer"
                className='flex items-center justify-content-center
                  hover:text-green-400 w-2/4'
              >
                {address}
                <SelectOutlined className="pl-4" />
              </a>
              <button 
                className="w-1/2 rounded-xl m-6 mb-0 p-2 hover:bg-green-400 bg-[#290b5a] hover:text-[#290b5a]"
                onClick={() => {}}
              >
                Disconnect Wallet
              </button>
            </div>
          </div>
        </div>
      }
      </div>
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
