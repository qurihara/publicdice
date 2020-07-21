'use strict';
const https = require('https');
const { kMaxLength } = require('buffer');

const MAX = 2500;
const START_HEIGHT = 10467965;//10469267;//10472661;//10472945;//10473673;//10473813;//10474012;
const WAIT = 20000;//60 * 60 * 1000 / 200;

async function main() {

    for (let b = START_HEIGHT; b >= 0; b--) {
        // let b = START_HEIGHT - i;
        getBlock(b);
        await sleep(WAIT);
    }
}
main();

function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

function getBlock(block) {
    let data = [];
    let v_url = "https://api.blockcypher.com/v1/eth/main/blocks/" + block;
    const req = https.request(v_url, (res) => {
        res.on('data', (chunk) => {
            data.push(chunk);
        });
        res.on('end', () => {
            var events = Buffer.concat(data);
            try {

                var r = JSON.parse(events);
                // console.log(r);
                if (r.hash != undefined) {
                    let rnd = getRand(r.hash, digits);
                    console.log(block + "," + r.hash + "," + rnd);
                }
            } catch (e) { }
        });
    })

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    req.end();
}

const digits = 16; // should determine by max
function getRand(hash, digits) {
    let x = hash.substr(hash.length - digits, digits);
    let d = parseInt(x, 16);
    let rnd = d / Math.pow(16, digits);
    return rnd;
}