/*let hashing = require('./hashing');
let BlockClass = require('./block.js');
const block = new BlockClass.Block('Test Block');
const data1 = "Blockchain Rock!";
const dataObject = {
	id: 1,
  	body: "With Object Works too",
  	time: new Date().getTime().toString().slice(0,-3)
};

hashing.sha(data1);
hashing.sha(dataObject);
block.generateHash().then((result)=>{
console.log(`Block Hash: ${result.hash} \n`);
console.log(`Block: ${JSON.stringify(result)} \n`);
}
).catch(
(error)=>{
console.log(error);
}
);*/
const bitcoin = require('bitcoinjs-lib');
const bitcoinMessage = require('bitcoinjs-message');

//  let pk=keypair.privateKey;

// let signature = bitcoinMessage.sign(message,pk,keypair.compressed);
// let signature1='HJLQlDWLyb1Ef8bQKEISzFbDAKctIlaqOpGbrk3YVtRsjmC61lpE5ErkPRUFtDKtx98vHFGUWl Fhsh3DiW6N0rE' ;
// let signature2='IFn36Idac3dLo3JvQ8/+AMfgQXbj9h3WIjDXJSUO+0ZbSOVEMhQK+t6RU3CC7ECvq9QshbRt LMLThDfCxa1RkYM=' ;
// let signature3='ICcppPF+jJ+9NlvssL+qfcZP9VRbcBq8Drpw91vo+Z5hHkBuLTy+9q70u+Roi03XUIIRw+x9TU5K 6FFm6Dhu718=' ;

// console.log(signature1.toString('base64')+'\n');
// console.log(signature2.toString('base64')+'\n');
// console.log(signature3.toString('base64')+'\n');

// let pbk= 'L365BaHQLS84X9oDssLSzXdGoF8xbA7krJof2h7EFtHQ5n51QLi6';
//  let keypair= bitcoin.ECPair.fromWIF(pbk); 
//   let pk = keypair.privateKey;             
// let message = '1gLZYJm812Ab18vTwYek9KwdpjLckcfZg: Udacity rocks!';

// Verify message
// let address = '1gLZYJm812Ab18vTwYek9KwdpjLckcfZg' ;
// console.log(bitcoinMessage.verify(message,address,signature1)+'\n');
// 
// console.log(bitcoinMessage.verify(message,address,signature2)+'\n');



// const signature = bitcoinMessage.sign(message,pk,keypair.compressed);
// console.log(signature.toString('base64')+'\n');


// console.log(bitcoinMessage.verify(message,address,signature)+'\n');


const be = require('blockexplorer');

/*async function  getBlock(index){
let hash = await be.blockIndex(index);
let block = await be.block(hash);
console.log(block);
}*/
 function  getBlock(index){
	let hash = be.blockIndex(index).then((hash)=>{
		hash = JSON.parse(hash).blockHash;
		console.log(`blockIndex:  ${index}  -  ${hash} \n`);
		 be.block(hash).
		 then((block)=>{
			 let bloque = JSON.parse(block);
			console.log(`Block:   ${index}  - ${bloque.hash}  \n`);
		 }).
		 catch((error)=>{
			console.error(error);
			});
	}).catch((error)=>{
    console.error(error);
	});

	}
	(function theLoop (i) {
		setTimeout(function () {
			getBlock(i);
			i++;
			if (i < 3) theLoop(i);
		}, 3600);
	  })(0);
	//   createrawtransaction '[{"txid":"TXID","vout": VOUT}]’’{“to_address”:amount1, “from_address”:amount2}’
	//   createrawtransaction '[{"txid":"59af0a21b8206d2e03ea0d18c0ca828a151a921badb6f822c52b5fe35185854e","vout": 0}]' '{“2NG1LxGha6Lo7AkpJBzBDUMuca5cxjfBLAQ”:0.0016, “2N6rwtg7AtYBtfVCYdoiMYRsGtRokdrRvxX”:0.0009}'
	//createrawtransaction '[{"txid":"e3c8b6e372c66c8ff1d2f73f0754376a216d6e4fae538d467b26ff6121719303","vout": 1}]''{"2NG1LxGha6Lo7AkpJBzBDUMuca5cxjfBLAQ":0.0016, "2N6rwtg7AtYBtfVCYdoiMYRsGtRokdrRvxX":0.0009}'

      //  txhash
	// 02000000010393712161ff267b468d53ae4f6e6d216a3754073ff7d2f18f6cc672e3b6c8e30100000000ffffffff02007102000000000017a914f9aae24780ea784b416fdc67e7096dbc18512e1d87905f01000000000017a914955b2c472a5bbb99249f7a71e1df4e642d5659a28700000000