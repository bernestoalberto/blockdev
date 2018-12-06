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
        this.chain=[];
       this.getBlockHeight().then((value)=>{
        if(value.length == 0){
            this.addBlock(new Block("First block in the chain - Genesis block"))
    }
        else{
            console.log(`BlockChain long is ${value.length} block(s)`);
        }
       }).catch((error)=>{console.log(error)});
       
    }
    createGenesisBlock(){
        return new Block("First block in the chain - Genesis block");
      }
    
      // getLatest block method
      getLatestBlock(){
        this.getBlockHeight().then((value)=>{
            if(value.length == 0){
                this.addBlock(new Block("First block in the chain - Genesis block"))
        }         
            if(value.length > 2){
            
            console.log(`The last block  id: ${value[value.length - 1].key} and #: ${(JSON.parse(value[value.length - 1].value).hash)} `);
            }
            else{
              console.log(`The last block  id: ${value[1].key} and #: ${(JSON.parse(value[1].value)).hash} `);
            }
            ;
           }).catch((error)=>{console.log(error)});
      }

// Add new block
    addBlock(newBlock){
        return new Promise((resolve, reject)=>{
        blockchain.getBlockHeight().then((blockchain)=>{
            if(blockchain.length > 0){
                newBlock.previousblockHash = JSON.parse(blockchain[blockchain.length-1].value).hash;
                newBlock.height = blockchain.length;
                newBlock.time =  new Date().getTime().toString().slice(0,-3);
                newBlock.hash =  SHA256(JSON.stringify(newBlock)).toString();
                level.addDataToLevelDB(newBlock).then((value)=>{
                    console.log(`New block was added ${newBlock.height}!!!`);
                 resolve(value);
               }).catch((error)=>{
                    reject(error);
               });
            }  
            else{
                level.addDataToLevelDB(newBlock).then((value)=>{
                    resolve(value);
               }).catch((error)=>{
                    reject(error);
               });
            }
        })
        .catch((error)=>{
         console.log(error);
        });
        });
 
    }
    
    printBlockChain(){
        level.getAllBlocks().then((list)=>{   
        (list.length > 0) ?console.log(`This is the genesis block ${list[0].value}`):'';
        // console.log(`This is the last block ${value[value.length - 1].value}`);
        for(let current of list){
            console.log(`Block # ${current.key} Hash : ${current.value} `);
        }
    }).catch((error)=>{
        console.error(error);

    });
    }
    //get block height
    getBlockHeight(){
        return new Promise((resolve,reject)=>{
        level.getAllBlocks(). then((blockchain)=>{
            // this.printBlockChain(blockchain);
            resolve(blockchain);
        }).
        catch((error)=>{
            console.log(error);
            reject(error);
        });
        });
    }
    //get block
    getBlock(blockHeight){
        return new Promise((resolve,reject)=>{
     level.getLevelDBData(blockHeight).then((block)=>{
         //validate block validateBlock
         let blockJson = '';
          if(blockHeight != 0){
            blockJson = JSON.parse(block);
          }
          else{
            blockJson= block;
          };
         console.log(`Hash:${blockJson.hash} => blockHeight: ${blockHeight}`);
         resolve(block);
     })
     .catch((error)=>{
        console.log(error);
        reject(Error(`Block ${blockHeight} not found!!! `));
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
       console.log(`Block # ${blockHeight} invalid hash:\n ${block} <> ${validBlockHash}`);
       reject(Error('Invalid Hash'));
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
        this.validateBlock(chain.key).then((error,value)=>{
        if(value==false)errorLog.push(i);
        // compare blocks hash link
        let blockHash = this.chain[i].hash;
        let previousHash = this.chain[i+1].previousBlockHash;
        if (blockHash!==previousHash)errorLog.push(i);
        }).catch((error)=>{
            console.log(error);
        });
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
// blockchain.printBlockChain();
// blockchain.addBlock(new Block("Block"));
console.log(`blockchain.chain`);
blockchain.getBlockHeight();
// blockchain.printBlockChain();
// blockchain.addBlock(new Block(`Block Vincero`));
// blockchain.getBlockHeight();
// level.deleteBlock(2);
// blockchain.getLatestBlock();
// blockchain.validateBlock(1);
// blockchain.getBlock(2);
// blockchain.getBlock(3);
// blockchain.getBlock(4);
// blockchain.getBlock(5);
// blockchain.getBlock(15);
// blockchain.getBlock(18);



//  level.deleteBlock(3);
//  blockchain.getBlockHeight();
/*for(let i = 3;i < 12; i++){
     blockchain.addBlock(new Block(`Block ${i}`));
}*/
// blockchain.validateChain();
// blockchain.getBlockHeight();
/*for(let i = 2;i < 6; i++){
  level.deleteBlock(i);
}*/
//  level.deleteBlock(2);
//  level.deleteBlock(3);
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
/*let j =3;
(function theLoop(j){
setTimeout(function () {
level.deleteBlock(j);
if (j++) theLoop(j);
},100);
})(10);*/


/*(function theLoop (i) {
    setTimeout(function () {
        blockchain.addBlock(new Block(`Block  ${i}`)).then((value)=>{
            blockchain.getBlockHeight();
            blockchain.getLatestBlock();
        }).catch((error)=>{console.log(error);});
      if (--i) theLoop(i);
    }, 100);
  })(10)*/