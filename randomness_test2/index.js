const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

web3.eth.getBlock(0, (error, result) => {
    console.log(result);
});