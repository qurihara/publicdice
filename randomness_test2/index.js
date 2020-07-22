const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

if (process.argv.length < 3) {
    console.log('uasge: node./ nonce_eth.js START_BLOCK');
    process.exit(1);
}
const START_BLOCK = +process.argv[2];
const WAIT = 1000;

function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

async function main() {

    for (let b = START_BLOCK; b >= 0; b--) {
        getBlock(b);
        await sleep(WAIT);
    }
}
main();

function getBlock(block) {
    web3.eth.getBlock(block, (error, result) => {
        console.log(error);
        console.log(result);
        if (result.hash != undefined) {
            let rnd = getRand(result.hash, digits);
            console.log(block + "," + result.hash + "," + rnd + "," + result.nonce);
        }
    });

}

const digits = 16; // should determine by max
function getRand(hash, digits) {
    let x = hash.substr(hash.length - digits, digits);
    let d = parseInt(x, 16);
    let rnd = d / Math.pow(16, digits);
    return rnd;
}