const SHA256 = require('crypto-js/sha256');
const level = require('./leveldbSandBox');
class Block {

    constructor(data){
    this.hash= "",
    this.height= 0,
    this.body = data,
    this.time = 0,
    this.previousblockHash = "0x"
 
}

}

class BlockChain{
    constructor(){
        this.chain =[];
       this.addBlock(new Block("First block in the chain - Genesis block"))
    }
    createGenesisBlock(){
        return new Block("First block in the chain - Genesis block");
      }
    
      // getLatest block method
      getLatestBlock(){
        return this.chain[this.chain.length -1];
      }

// Add new block
    addBlock(newBlock){
        newBlock.height = this.chain.length;
        newBlock.time =  new Date().getTime().toString().slice(0,-3);
        if(this.chain.length > 0){
         newBlock.previousblockHash = this.chain[this.chain.length-1].hash;
        }
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
        this.chain.push(newBlock);
        level.addDataToLevelDB(newBlock);
    }
    //get block height
    getBlockHeight(){
        level.getAllBlocks().
        then((value)=>{
            console.log(`BlockChin long is ${value.length} block(s)`);
            console.log(`This is the last block ${value[value.length - 1].value}`);
        }).
        catch((error)=>{
            console.log(error);
        });
    }
    //get block
    getBlock(blockHeight){
        //  level.getLevelDBData(JSON.parse(JSON.stringify(this.chain[blockHeight]))).
        return new Promise((resolve,reject)=>{
     level.getLevelDBData(blockHeight).
     then((value)=>{
         //validate block validateBlock
         console.log(`Hash:${value} => blockHeight: ${blockHeight}`);
         resolve(value);
     })
     .catch((error)=>{
        console.log(error);
     });
    });
    }

 // validate block
 validateBlock(blockHeight){
    return new Promise((resolve,reject)=>{
    // get block object
    let block=   this.getBlock(blockHeight).then((block)=>{
   // get block hash
   let blockHash = block.hash;
   // remove block hash to test block integrity
//    block.hash = '';
   // generate block hash
   let validBlockHash = SHA256(JSON.stringify(block)).toString();
   // Compare
   if (blockHash===validBlockHash) {
       console.log('valid');
       resolve(true);
     } else {
       console.log(`Block # ${blockHeight} invalid hash:\n ${blockHash} <> ${validBlockHash}`);
       reject(false);
     }
    }).catch((error)=>{
        console.log(error);
        reject(error);
     });
    });
    
    }
   // Validate blockchain
    validateChain(){
      let errorLog = [];
     level.getAllBlocks().then((chains)=>{
      for (let chain of chains) {
        // validate block
        this.validateBlock(chain.key).then((value)=>{
        if(value==false)errorLog.push(i);
        // compare blocks hash link
        let blockHash = this.chain[i].hash;
        let previousHash = this.chain[i+1].previousBlockHash;
        if (blockHash!==previousHash)errorLog.push(i);
        })
      } 
      if(errorLog.length>0) {
        console.log(`Block errors =  ${errorLog.length}`);
        console.log(`Blocks: ${errorLog}`);
      } else {
        console.log(`No errors detected`);
      }
    }).catch((error)=>{
        console.log(error);
    });
}
}


let blockchain = new BlockChain();
//  console.log(` blockchain.chain`);
// blockchain.validateBlock(1);
// blockchain.getBlock(1);
blockchain.validateChain();


/* ===== Testing ==============================================================|
|  - Self-invoking function to add blocks to chain                             |
|  - Learn more:                                                               |
|   https://scottiestech.info/2014/07/01/javascript-fun-looping-with-a-delay/  |
|                                                                              |
|  * 100 Milliseconds loop = 36,000 blocks per hour                            |
|     (13.89 hours for 500,000 blocks)                                         |
|    Bitcoin blockchain adds 8640 blocks per day                               |
|     ( new block every 10 minutes )                                           |
|  ===========================================================================*/


/*(function theLoop (i) {
    setTimeout(function () {
        blockchain.addBlock(new Block(`Testing  ${i}`)).
        then((value)=>{
            console.log(`Value = ${value}`);
        }).catch((error)=>{
            console.log(error);
        }
        );
      if (--i) theLoop(i);
    }, 100);
  })(10);*/