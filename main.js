const SHA256 = require('crypto-js/sha256')
//importing the cryto-js package from npm using npm crypto-js

/*To reuse the code let's create a class called "Block" with 4 parameters
    index: for having an index like an array ones
    timestamp:for having a time stamp for newly created ones
    data: the data of the transaction might be another class or an array of some sorts
    previousHash: the previous linked Block hash
    hash: current generated hash 

*/

class Block{
    constructor(index, timestamp, data, previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nounce = 0;
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp +JSON.stringify(this.data + this.nounce)).toString();

    }
    mineBlock(dificulity){
        while(this.hash.substring(0, dificulity) !== Array(dificulity+1).join("0")){
            this.nounce++;
            this.hash = this.calculateHash()
        }
        console.log("block mined: " + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()]
        this.difficulty = 3;
    }
    createGenesisBlock(){
        return new Block(0,"01/01/2014", "Genesis Block", "0")
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1]
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty)
        newBlock.hash = newBlock.calculateHash();

        this.chain.push(newBlock);
    }
    isChainValid(){
        for(let i =  1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
        }
    }
}

let savjeeCoin = new Blockchain();
console.log("minning the first block ... here is the time ")
savjeeCoin.addBlock(new Block(1,"01/01/2014", {amount: 40} ))
console.log("minning the first block ... ")

savjeeCoin.addBlock(new Block(2,"01/02/2020", {ammount: 50}))

