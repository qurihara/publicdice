'use strict';
const https = require('https');
const { kMaxLength } = require('buffer');

const MAX = 2500;
const START_HEIGHT = 10474012;
const WAIT = 20000;//60 * 60 * 1000 / 200;

async function main() {

    for (let i = 0; i < MAX; i++) {
        let b = START_HEIGHT - i;
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
            var r = JSON.parse(events);
            // console.log(r);
            if (r.hash != undefined) {
                console.log(block + "," + r.hash);
            }


        });
    })

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    req.end();
}

