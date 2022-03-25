import React, { useState, useEffect } from 'react'
import { BigNumber, ethers } from 'ethers'
import $ from 'jquery';
import Home from './Home';

export default function Main(props) {
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
  chain_ID.set('polygon', 137);
  chain_ID.set('testnet', 80001);
  chain_ID.set('bsc', 56);
  chain_ID.set('bsctestnet', 97);

  useEffect(() => {
    setReadFlag(true)
    setIsABIAvailabe(false)
    setInputValue('')
    setAbiInputValue('')
    setDropDownValue('')
    setGivenContractAddress('')
    setContractABI([])
    return props.changeFlag
  }, [props.flag])

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
    let ethChains= ['mainnet' , 'ropsten', 'rinkeby', 'kovan', 'goerli']
    let polyChains= ['polygon' , 'testnet']
    let bscChains = ['bsc', 'bsctestnet']

    let apiParam = 'https://api'
    let part2 = '.etherscan.io/api?module=contract&action=getabi&address='
    // let apiKey = `&apikey=${process.env.REACT_APP_ETHERSCAN_KEY}`
    let apiKey = `&apikey=A9MMS9EMRS3BZNU54PYB1TMNN8EUNIM1ZT`
    
    if(ethChains.includes(givenChain)){
      if(givenChain!='mainnet'){
        apiParam = `https://api-${givenChain}`
      }
    }else if(polyChains.includes(givenChain)){
      if(givenChain!='polygon'){
        apiParam = `https://api-${givenChain}`
      }
      part2 = '.polygonscan.com/api?module=contract&action=getabi&address='
      apiKey = '&apikey=WA9QSEATSE4EQM8R8IS5TVMGAU35KTUURP'
    }else if(bscChains.includes(givenChain)){
      if(givenChain=='bsctestnet'){
        apiParam = `https://api-testnet`
      }
      part2 = '.bscscan.com/api?module=contract&action=getabi&address='
      apiKey = '&apikey=RM4J9F55E5T331EP445AJX2ARB4YXVQTRH'
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
      if(submittedABI.abi){
        submittedABI = submittedABI.abi;
      }
    } catch (e) {
      return alert('Problem with JSON format');
    }
    setIsABIAvailabe(false);
    // console.log(submittedABI);
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
    setGivenContractAddress(contractAddress)
    const url = constructURL(chain,contractAddress);

    try{        
      $.getJSON(url, function (data) {
          var contractABI = "";
          if(data.status==0){
            // alert(data.result);
            return checkisABIAvilable();
          }
          contractABI = JSON.parse(data.result);
          console.log("ABI returend",contractABI);
          for(var i=0;i<contractABI.length;i++){
            if(contractABI[i].name && contractABI[i].stateMutability=='payable'){
              var payAmount = {internalType: 'uint256', name: contractABI[i].name , type: 'uint256'};
              
              contractABI[i].inputs.unshift(payAmount)
            }
          }
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

      // $(`${name}submit`).addClass("cursor-not-allowed");
      // $(`${name}submit`).prop("disabled",true);

      const formElement = e.target;
      const formElements = formElement.elements;

      const inputValues = [];

      for (let i = 0; i < formElements.length-1; i++) {
        const element = formElements[i];
        if (element.nodeName === "INPUT") {
          if(!isNaN(element.value) && stateMutability=='payable'){
            inputValues.push(ethers.utils.parseEther(element.value))
          }else{
            inputValues.push(element.value);
          }
        }
      }

      console.log(name);
      console.log('inputValues', inputValues);
      // name(...inputValues)
      
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const MyContract = new ethers.Contract( givenContractAddress , contractABI , signer);
      try{
        const { ethereum } = window;

        let chainId = await ethereum.request({ method: 'net_version' });
        if (chainId !== `${chain_ID.get(dropDownValue)}`) {
          alert(`Please change your netwrok to "${dropDownValue}" in your wallet`);
          return;
        }
        let gasEstimateByProv = await MyContract[name](...inputValues);
        const readFuncs = ['pure', 'view']
        let tx;
        if(readFuncs.includes(stateMutability)){
          tx = await MyContract[name](...inputValues);
        }else{
          tx = await MyContract[name](...inputValues, {gasLimit: (2*gasEstimateByProv+50000)});
        }
        $( `#${name}result` ).html(`Result : ${tx}`);
      }catch(error){
        try{
          if(!(error.data.message.indexOf('BigNumber') > -1)){
            alert(error.data.message)
          }          
        }catch{
          try{
            if(!(error.message.split('"message"')[1].split('"')[1].indexOf('BigNumber') > -1)){
              alert(error.message.split('"message"')[1].split('"')[1])
            }            
          }
          catch{
            if(!(error.message.indexOf('BigNumber') > -1)){
              alert(error.message)
            }
          }   
        }             
      }
      
    };

    const renderInput = (input) => {
      const { internalType, name, type} = input;
      return (
        <div className="grid grid-cols-3 gap-2 w-full py-3">
          <label className="font-bold break-words">{name}</label>
          <input type="text" className='px-3 py-1 text-black rounded-md col-span-2' placeholder={type} required />
        </div>
      );
    }

    const renderName = () => <div className="font-bold text-xl mb-3 break-words text-violet-400">{name}</div>;
    const renderDynamicInputs = () => inputs.map(renderInput);
    const renderSubmitAction = () => (
      <button type="submit" id={`${name}submit`} className='hover:bg-green-400 bg-[#5925ad]
      hover:text-[#290b5a] text-white font-bold mt-4 py-2 px-4 rounded-xl'>Submit</button>
    );

    return (
      <form key={`${index}${name}`} onSubmit={handleSubmit} 
        className="flex-col justify-center gap-4 items-start border-2 p-4 overflow-auto rounded-md 
        border-r-purple-700 border-b-purple-700 border-l-green-400 border-t-green-400">
        {renderName()}
        {renderDynamicInputs()}
        {renderSubmitAction()}
        <p className='px-2 py-2 text-left my-2 font-semibold break-words text-white' id={`${name}result`} ></p>
      </form>
    ); 
  };

  const renderDynamicUi = (data, index) => {
    const { type } = data;
    const typeRenderer = type === 'function' ? renderFuntionType : null;

    if(!typeRenderer) return null;
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
        {!givenContractAddress && <Home />}
      {isABIAvailabe && <div className='backdrop-filter z-10 backdrop-blur-sm inset-0
                        flex justify-center items-center text-left overflow-hidden fixed'>
          
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

              <textarea id='abiTextField' cols="71" wrap="soft" placeholder="If yes, Please paste it here, else click 'NO'"
              className="form-control relative flex-auto min-w-0 block w-full px-8 py-6 
              text-base font-normal text-[#f8f9fb] bg-[#02104d] bg-clip-padding rounded-xl
              transition ease-in-out m-0 focus:text-[#f8f9fb] focus:bg-[#02104d]
              focus:border-blue-600 focus:outline-none placeholder:text-xs" 
              required 
              value={abiInputValue}
              onChange={onABIInputChange}></textarea>
                          
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
      <div className="flex justify-center mb-6 px-3 mt-16 py-2 xl:w-full md:w-full mx-auto sticky top-0 backdrop-blur-md">
        <div className="xl:w-2/3 md:w-2/3 mx-auto">
          <div className="relative flex justify-center w-full rounded">
            <form className="flex justify-center items-center"
              onSubmit={(event) => {
                event.preventDefault();
                getABI();
              }}
            > 
                
              <div className="w-1/3 mr-4">
                <div className=" break-words ">
                  <select className="form-select appearance-none block w-full px-3 py-3 text-base font-normal text-white 
                  bg-[#02104d] bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out m-0 focus:border-none
                  focus:text-white focus:bg-[#02104d] focus:outline-none" aria-label="Default select example" 
                  required
                  value={dropDownValue}
                  onChange={onDropdownChange}
                  >
                      <option value="">Select chain</option>
                      <option value="mainnet">Ethereum mainnet</option>
                      <option value="rinkeby">Rinkeby</option>
                      <option value="ropsten">Ropsten</option>
                      <option value="kovan">Kovan</option>
                      <option value="goerli">Goerli</option>
                      <option value="polygon">Polygon(Matic)</option>
                      <option value="testnet">Mumbai(Testnet)</option>
                      <option value="bsc">BSC-Mainnet</option>
                      <option value="bsctestnet">BSC-Testnet</option>
                      
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
          <p className='mt-2'>⚠️This tool is in early stage, please use it with caution⚠️</p>
          <p className='mt-2'>Checkout our demo <a href="https://youtu.be/oQOHYjIFQ48" target="_blank"><u>video</u></a></p>

          {/* <p className='mt-2'>Contact us via <a href="https://twitter.com/bytehash_tech" target="_blank" ><u>
            Twitter</u></a> to report any bug</p> */}
        </div>
      </div>
      {/* <div className="flex justify-center gap-10 my-4 mb-10">
        <p>
          Read and write Contracts
        </p>
      </div> */}
      { givenContractAddress && 
      <div className="flex justify-center gap-10 my-4 mb-10">
      <p>∎</p>
        <p
          onClick={!readFlag ? onChange : () => {}}
          className={`${
            readFlag
              ? 'text-green-400 cursor-pointer hover:text-green-400 bg-[#060c3e] rounded p-1'
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
              ? 'text-green-400 cursor-pointer hover:text-green-400 bg-[#060c3e] rounded p-1'
              : 'text-gray-400 cursor-pointer hover:text-green-400'
          }`}
        >
          Write Contract
        </p>
        <p>∎</p>
      </div>
        }
      {/* {renderUi()} */}
      <div className="px-6 mb-14">
        {readFlag && RenderUI('read')}
        {!readFlag && RenderUI('write')}
      </div>
    </div>
  )
}
