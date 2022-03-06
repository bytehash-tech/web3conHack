# byteHash - Blockchain agnostic user interface to test/trigger smart contract functions
This tool has been developed in [@web3con](https://twitter.com/web3con) hackathon bootsraped by [@Developer_Dao](https://twitter.com/developer_dao)

This tool helps users to interact eith smartcontracts from single place.

Be it a developer or a normal user trying to see how to interact with testnets can use this tool.

As of now there are two possibilities:
Once you select chain and submit the contract address - 
1. If the code for that smart contract has been verified and published in eterscan,polygonscan or bscscan we directly get those functions adn display on our interface and are ready for interaction.
2. If the code is not verified and published we ask user if they have ABI(JSON), if you are a developer you might have it in your project repo, copy paste it in the area when adkedd in a popup, after that we generate the dynamic ui depending on function type and number of functions available to interact.

#NOTE:
You can interact/trigger individual functions available and displaying on the screen, ```make sure you have connected your wallet(Metamask,coinbase etc.,) to the correct network you have selected in the dropdown above.```

This is an early stage product, so there might be bugs.

Please follow us in twitter and DM [@byteHash](https://twitter.com/bytehash_tech) to inform about bugs 
