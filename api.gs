function doGet(e){
  return toOutput(JSON.stringify(e));
}

function toOutput(value){
  var response = get_cur();
  ContentService.createTextOutput()
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify(response));
  return output;
}

const digits = 16; // should determine by max
const wait = 20000;
function get_cur(){
  Utilities.sleep(wait);
  var url = "https://api.blockcypher.com/v1/eth/main";
  var option = {};
  var response = UrlFetchApp.fetch(url, option).getContentText();
  var contents = JSON.parse(response);

  let c_block = Number(contents.height);
  let r = getRand(contents.hash, digits);
  let v_url = "https://api.blockcypher.com/v1/eth/main/blocks/" + c_block;

  return {block:c_block, hash:contents.hash, url:v_url, value:r};
}

function getRand(hash, digits) {
        let x = hash.substr(hash.length - digits, digits);
        let d = parseInt(x, 16);
        let rnd = d / Math.pow(16, digits);
        return rnd;
}
