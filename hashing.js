let cryptoSha = require('crypto-js/sha256');
let crypto  = {

    sha: (obj)=>{
        let ob = (typeof obj === "object") ? JSON.stringify(obj):obj;
    let hash = cryptoSha(ob).words;
    let final = '';
    for(let current of hash){
     final += current+'-';
    }
    console.log(final);
    }



};

module.exports = crypto;