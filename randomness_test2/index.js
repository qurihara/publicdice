const async = require('async');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

if (process.argv.length < 3) {
    console.log('uasge: node./ nonce_eth.js START_BLOCK');
    process.exit(1);
}
const START_BLOCK = +process.argv[2];
const WAIT = 1000;

// web3.eth.isSyncing().then((syncing) => {
//     let i = START_BLOCK;
//     async.whilst(() => i <= syncing.currentBlock, (cb) => {
//         web3.eth.getBlock(i).then((block) => {
//             console.log(i + ',' + web3.utils.hexToNumberString(block.nonce));
//             i++;
//             cb();
//         });
//     }, () => process.exit(0));
// });



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
// main();

let i = START_BLOCK;
// async.whilst(() => i <= syncing.currentBlock, (cb) => {
async.whilst(() => i <= 2, (cb) => {
    web3.eth.getBlock(i).then((block) => {
        console.log(i + ',' + web3.utils.hexToNumberString(block.nonce));
        i++;
        cb();
    });
}, (e) => console.log(e));
// }, () => process.exit(0));


function getBlock(block) {
    web3.eth.getBlock(block, (error, result) => {
        if (error != null) {
            console.log(block + "," + error);
        }
        // console.log(result);
        if (result != undefined) {
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