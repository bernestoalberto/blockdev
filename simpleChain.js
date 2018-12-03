const SHA256 = require('crypto-js/sha256');
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


    addBlock(newBlock){
        newBlock.height = this.chain.length;
        newBlock.time =  new Date().getTime().toString().slice(0,-3);
        if(this.chain.length > 0){
         newBlock.previousblockHash = this.chain[this.chain.length-1].hash;
        }
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
        this.chain.push(newBlock);
    }
}

let blockchain = new BlockChain();
// console.log(blockchain.chain);
blockchain.addBlock(new Block('test'));
// console.log(blockchain.chain);
blockchain.addBlock(new Block('test 3'));
console.log(blockchain.chain);

