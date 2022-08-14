const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3             = require('web3');
const compiledFactory  = require('../ethereum/build/IdeaFactory.json');

const provider = new HDWalletProvider(
    'direct zone shove unfold zone wire prize erase mean useful aerobic final',
    'https://rinkeby.infura.io/v3/ab89e851a40e4fdb973003e19d2d6f32'
);
const web3 = new Web3(provider);


const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    console.log('Attempting to deploy the contract from account ', accounts[4]);

    const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object }).send({ gas: '2000000', from: accounts[4] });

    console.log(compiledFactory.abi);
    console.log('Contract deployed to address ', result.options.address);
    provider.engine.stop();

};

deploy();