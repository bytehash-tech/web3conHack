import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import $ from 'jquery';
import { ETHLogo } from './Logos';

export default function Main() {
  const [readFlag, setReadFlag] = useState(true)
  const [isABIAvailabe, setIsABIAvailabe] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [abiInputValue, setAbiInputValue] = useState('');
  const [dropDownValue, setDropDownValue] = useState('');
  const [givenContractAddress, setGivenContractAddress] = useState('');
  const [contractABI, setContractABI] = useState([]);
  const chain_ID = new Map();
  chain_ID.set('mainnet', 1);
  chain_ID.set('ropsten', 3);
  chain_ID.set('rinkeby', 4);
  chain_ID.set('goerli', 5);
  chain_ID.set('kovan', 42);

  function onChange() {
    setReadFlag((prevState) => !prevState)
  }

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const onABIInputChange = (event) => {
    const {value} = event.target;
    setAbiInputValue(value);
  }

  const onDropdownChange = (event) => {
    const { value } = event.target;
    setDropDownValue(value);
  };

  function constructURL(givenChain, givenCAddress){
    let apiParam = 'https://api'
    let part2 = '.etherscan.io/api?module=contract&action=getabi&address='
    // let apiKey = `&apikey=${process.env.REACT_APP_ETHERSCAN_KEY}`
    let apiKey = `&apikey=A9MMS9EMRS3BZNU54PYB1TMNN8EUNIM1ZT`
    

    if(givenChain!='mainnet'){
      apiParam = `https://api-${givenChain}`
    }


    let tempurl = apiParam+part2+givenCAddress+apiKey;

    return tempurl;
  }

  const checkisABIAvilable = () => {
    setIsABIAvailabe(true);
  }

  const yesClicked = () =>{
    // console.log("YES clicked");
    try {
      var submittedABI = JSON.parse(abiInputValue);
    } catch (e) {
      return alert('Problem with JSON format');
    }
    setIsABIAvailabe(false);
    console.log(submittedABI);
    setContractABI(submittedABI);
  }

  const noClicked = (e)  => {
    e.preventDefault();
    // console.log("NO clicked");
    // tryExperimentalFeature();
    setIsABIAvailabe(false);
  }

  function constructEXPURL(givenChain, givenCAddress){
    let apiParam = 'https://api.ethervm.io/v1/decompile/'
    let chainSupported = ['ethereum' , 'ropsten', 'rinkeby', 'kovan', 'binance', 'tron']
    if(!chainSupported.includes(givenChain)){
      alert('This experimental feature supports only these chains: ethereum,ropsten,rinkeby,kovan,binance,tron')
    }

    let tempurl = apiParam+givenChain+'/'+givenCAddress;

    return tempurl;
  }

  const tryExperimentalFeature = async ()=>{
    const contractAddress = inputValue;
    const chain = dropDownValue;
    const expurl = constructEXPURL(chain,contractAddress);
    try{
      const response = await fetch(expurl, {
            method: 'GET',
        });
      // $.getJSON(expurl, function (data) {
      //     var contractABI = "";
      //     if(data.success==false){
      //       alert(data.error);
      //     }
      const responseJsonAddr = await response.json()
      contractABI = JSON.parse(responseJsonAddr);
      console.log("ABI returend",contractABI); 
          // setContractABI(contractABI);
      // });
    }catch (error) {
      console.log(error)
    }
  }

  const getABI = async () =>{
    const contractAddress = inputValue;
    const chain = dropDownValue;
    console.log("given Address", contractAddress)
    setGivenContractAddress(contractAddress)
    console.log("given chain", chain)
    const url = constructURL(chain,contractAddress);
    console.log("urlGenerated",url)
    // return;

    try{        
      $.getJSON(url, function (data) {
          var contractABI = "";
          if(data.status==0){
            // alert(data.result);
            return checkisABIAvilable();
            
          }
          contractABI = JSON.parse(data.result);
          console.log("ABI returend",contractABI); 
          setContractABI(contractABI);
      });
    }catch (error) {
      console.log(error)
    }    
  }

  // function getUI(){
  //   return(
  //   <div className="mt-5 xl:w-1/3 md:w-1/2 mx-auto">
  //   {/* item 1 */}
  //   <div>
  //     <p className="md:space-x-1 space-y-1 md:space-y-0 mb-4">
  //       <a
  //         className="flex items-center w-full px-6 py-3  bg-[#051338] text-white font-medium text-xs leading-tight 
  //             uppercase rounded-md shadow-md hover:shadow-lg border-2 border-[#1d2682]
  //             text-left
  //             focus:shadow-lg focus:outline-none focus:ring-0
  //             active:shadow-lg transition duration-150 
  //             ease-in-out"
  //         data-bs-toggle="collapse"
  //         href="#collapseExample"
  //         role="button"
  //         aria-expanded="false"
  //         aria-controls="collapseExample"
  //       >
  //         1. Auction_drop_interval
  //         <svg
  //           color="#1d2682"
  //           xmlns="http://www.w3.org/2000/svg"
  //           className="h-6 w-6 ml-auto"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <path
  //             stroke-linecap="round"
  //             stroke-linejoin="round"
  //             stroke-width="2"
  //             d="M19 9l-7 7-7-7"
  //           />
  //         </svg>
  //       </a>
  //     </p>
  //     <div className="collapse" id="collapseExample">
  //       <div className="block p-6 rounded-lg shadow-lg ">
  //         Some placeholder content for the collapse component. This panel
  //         is hidden by default but revealed when the user activates the
  //         relevant trigger.
  //       </div>
  //     </div>
  //   </div>

  //   {/* item2 */}
  //   <div>
  //     <p className="md:space-x-1 space-y-1 md:space-y-0 mb-4">
  //       <a
  //         className="flex items-center w-full px-6 py-3  bg-[#051338] text-white font-medium text-xs leading-tight 
  //             uppercase rounded-md shadow-md hover:shadow-lg border-2 border-[#1d2682]
  //             text-left
  //             focus:shadow-lg focus:outline-none focus:ring-0
  //             active:shadow-lg transition duration-150 
  //             ease-in-out"
  //         data-bs-toggle="collapse"
  //         href="#collapseExample1"
  //         role="button"
  //         aria-expanded="false"
  //         aria-controls="collapseExample"
  //       >
  //         1. Auction_drop_interval
  //         <svg
  //           color="#1d2682"
  //           xmlns="http://www.w3.org/2000/svg"
  //           className="h-6 w-6 ml-auto"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <path
  //             stroke-linecap="round"
  //             stroke-linejoin="round"
  //             stroke-width="2"
  //             d="M19 9l-7 7-7-7"
  //           />
  //         </svg>
  //       </a>
  //     </p>
  //     <div className="collapse" id="collapseExample1">
  //       <div className="block p-6 rounded-lg shadow-lg ">
  //         Some placeholder content for the collapse component. This panel
  //         is hidden by default but revealed when the user activates the
  //         relevant trigger.
  //       </div>
  //     </div>
  //   </div>
  // </div>)
  // }

  const renderFuntionType = (data, index) => {
    const { inputs = [], name, outputs, stateMutability, type } = data;

    const handleSubmit = async(e) => {
      e.preventDefault();

      const formElement = e.target;
      const formElements = formElement.elements;

      const inputValues = [];

      for (let i = 0; i < formElements.length-1; i++) {
        const element = formElements[i];
        if (element.nodeName === "INPUT") {
          inputValues.push(element.value);
        }
      }

      console.log(name);
      console.log('inputValues', inputValues);
      // name(...inputValues)
      
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const MyContract = new ethers.Contract( givenContractAddress , contractABI , signer);
      var funName = name+'.'+'(...inputValues)';
      try{
        const { ethereum } = window;

        let chainId = await ethereum.request({ method: 'eth_chainId' });
        console.log("Connected to chain " + chainId);

        // String, hex code of the chainId of the Rinkebey test network
        // const rinkebyChainId = "0x4"; 
        if (chainId !== `0x${chain_ID.get(dropDownValue)}`) {
          alert(`Please change your netwrok to "${dropDownValue}"`);
          return;
        }
        let gasEstimateByProv = await MyContract[name](...inputValues);
        let tx = await MyContract[name](...inputValues, {gasLimit: 1.5*gasEstimateByProv});
        $( `#${name+'result'}` ).html(`Result : ${tx}`);
      }catch(error){
        try{alert(error.message.split('"message"')[1].split('"')[1])}
        catch{
          alert(error.message)
        }        
      }
      
    };

    const renderInput = (input) => {
      const { internalType, name, type } = input;
      return (
        <div className="grid grid-cols-3 gap-2 w-full py-3">
          <label className="font-bold">{name}</label>
          <input type="text" className='px-3 py-1 text-black rounded-md col-span-2' placeholder={type} required />
        </div>
      );
    }

    const renderName = () => <div className="font-bold text-xl mb-3 text-violet-400">{name}</div>;
    const renderDynamicInputs = () => inputs.map(renderInput);
    const renderSubmitAction = () => (
      <button type="submit" className='hover:bg-green-400 bg-[#5925ad]
      hover:text-[#290b5a] text-white font-bold mt-4 py-2 px-4 rounded-xl'>Submit</button>
    );

    return (
      <form key={`${index}${name}`} onSubmit={handleSubmit} 
        className="flex-col justify-center gap-4 items-start border-2 p-4 rounded-md">
        {renderName()}
        {renderDynamicInputs()}
        {renderSubmitAction()}
        <p className='px-2 text-white' id={name+'result'} ></p>
      </form>
    );
  };

  const renderDynamicUi = (data, index) => {
    const { type } = data;
    // const index = index;
    // console.log('index is:',index)
    const typeRenderer = type === 'function' ? renderFuntionType : null;

    if(!typeRenderer) return null;
    console.log('index is:',index)
    return typeRenderer(data, index);
  }

  // const renderUi = () => (
  //   <div className="grid grid-cols-3 gap-4 p-4" id='functionDisplay'>
  //     {contractABI.map(renderDynamicUi)}
  //   </div>
  // );

  const RenderUI = (type) => {
    //   const read = contractABI.filter(data => console.log(data))
    const readFuncs = ['pure', 'view']
    const read = contractABI.filter(data => readFuncs.includes(data.stateMutability)).map(renderDynamicUi)
    const write = contractABI.filter(data => !readFuncs.includes(data.stateMutability)).map(renderDynamicUi)
    if(type === 'read'){
        return (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4" id='functionDisplay'>
                {read}
            </div>
        )
    } else if (type === 'write'){
        return (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4" id='functionDisplay'>
                {write}
            </div>
        )
    }
  }

  return (
    <div>
      {isABIAvailabe && <div className='backdrop-filter z-10 backdrop-blur-sm absolute inset-0
                        flex justify-center items-center text-left'>
          
          <div className="bg-[#4c249f] p-6 w-2/4 rounded-xl md:w-1/2">
            <div className="flex justify-center">
              <p className="font-semibold text-center">⚠️ABI NOT FOUND⚠️<br>
              </br><br></br>By anychance do have ABI(JSON) for the contract? 🤔<br></br><br>
              </br></p>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                yesClicked();
              }}>

              <input
                type="text"
                className="form-control relative flex-auto min-w-0 block w-full px-8 py-6 
                          text-base font-normal text-[#f8f9fb] bg-[#02104d] bg-clip-padding rounded-xl
                          transition ease-in-out m-0 focus:text-[#f8f9fb] focus:bg-[#02104d]
                          focus:border-blue-600 focus:outline-none placeholder:text-xs"
                size='50'
                placeholder="If yes, Please paste it here, else click 'NO'"
                required
                value={abiInputValue}
                onChange={onABIInputChange}
              />
                          
              <div className="flex flex-row">
                <button type='submit'
                  className="w-1/2 rounded-xl m-6 mb-0 p-2 hover:bg-green-400 bg-[#290b5a] hover:text-[#290b5a]"
                  // onClick={yesClicked}
                >
                  Yes
                </button>
                <button 
                  className="w-1/2 rounded-xl m-6 mb-0 p-2 hover:bg-green-400 bg-[#290b5a] hover:text-[#290b5a]"
                  onClick={noClicked}
                >
                  No!(No way to interact)
                </button>
                {/* <br></br>TRY "EXPERIMENTAL🧪" FEATURE POWERED BY ethervm.io  */}
              </div>
            </form>
          </div>
        </div>
      }
      <div className="flex justify-center mt-16 py-2 xl:w-full md:w-full mx-auto">
        <div className="xl:w-2/3 md:w-1/2 mx-auto">
          <div className="relative flex justify-center w-full mb-4 rounded">
            <form className="flex justify-center items-center"
              onSubmit={(event) => {
                event.preventDefault();
                getABI();
              }}
            > 
                
              <div className="w-1/3 mr-4">
                <div className="">
                  <select className="form-select appearance-none block w-full px-3 py-3 text-base font-normal text-white 
                  bg-[#02104d] bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out m-0 focus:border-none
                  focus:text-white focus:bg-[#02104d] focus:outline-none" aria-label="Default select example" 
                  required
                  value={dropDownValue}
                  onChange={onDropdownChange}
                  >
                      <option value="">Select chain</option>
                      <option value="rinkeby">Rinkeby</option>
                      <option value="ropsten">Ropsten</option>
                      <option value="kovan">Kovan</option>
                      <option value="goerli">Goerli</option>
                      <option value="mainnet">Ethereum mainnet</option>
                  </select>
                </div>
              </div>
              <div className="relative flex flex-auto items-stretch w-full rounded">
              <input
                type="search"
                className="form-control relative flex-auto min-w-0 block w-full px-8 py-6 
                          text-base font-normal text-[#f8f9fb] bg-[#02104d] bg-clip-padding rounded-xl
                          transition ease-in-out m-0 focus:text-[#f8f9fb] focus:bg-[#02104d]
                          focus:border-blue-600 focus:outline-none placeholder:text-xs"
                size='50'
                placeholder="Paste contract address here"
                required
                value={inputValue}
                onChange={onInputChange}
              />
            <button type="submit">
            <span 
              className="absolute cursor-pointer inset-y-0 right-0 p-6 input-group-text flex items-center pr-8 py-1.5 text-base font-normal bg-[#02104d]
                        text-gray-700 text-center whitespace-nowrap rounded-xl"
            >
              <svg
                color="#42e276"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            </button>
            </div>
            {/* <span
              className="absolute bottom-0 right-0 input-group-text flex items-center p-4 pr-4 text-base font-normal bg-[#02104d]
                        text-gray-700 text-center whitespace-nowrap rounded-xl"
            >
              <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
                submit
              </button>
            </span> */}
            </form>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center gap-10 my-4 mb-10">
        <p>
          Read and write Contracts
        </p>
      </div> */}
      <div className="flex justify-center gap-10 my-4 mb-10">
      <p>∎</p>
        <p
          onClick={!readFlag ? onChange : () => {}}
          className={`${
            readFlag
              ? 'text-[#f8f9fb] cursor-pointer hover:text-green-400'
              : 'text-gray-400 cursor-pointer hover:text-green-400'
          }`}
        >
          Read Contract
        </p>
        <p>┋</p>
        <p
          onClick={onChange}
          className={`${
            !readFlag
              ? 'text-[#f8f9fb] cursor-pointer hover:text-green-400'
              : 'text-gray-400 cursor-pointer hover:text-green-400'
          }`}
        >
          Write Contract
        </p>
        <p>∎</p>
      </div>
      {/* {renderUi()} */}
      <div className="px-6">
        {readFlag && RenderUI('read')}
        {!readFlag && RenderUI('write')}
      </div>
    </div>
  )
}
