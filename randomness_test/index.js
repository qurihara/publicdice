'use strict';
// var request = require('request');
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
    // v_url = "https://api.blockcypher.com/v1/eth/main/blocks/" + block;
    // var options = {
    //     url: v_url,
    //     method: 'GET',
    //     json: true
    // }
    // request(options, function (error, response, body) {
    //     console.log(body);
    // })

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
            // var contents = JSON.parse(chunk);
            // console.log(chunk);
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


// function get_cur() {
//     Utilities.sleep(wait);
//     var url = "https://api.blockcypher.com/v1/eth/main";
//     var option = {};
//     var response = UrlFetchApp.fetch(url, option).getContentText();
//     var contents = JSON.parse(response);

//     let c_block = Number(contents.height);
//     let r = getRand(contents.hash, digits);
//     let v_url = "https://api.blockcypher.com/v1/eth/main/blocks/" + c_block;

//     return { block: c_block, hash: contents.hash, url: v_url, value: r };
// }

