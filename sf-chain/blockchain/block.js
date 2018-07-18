const ChainUtil=require('../chain-util');

const { DIFFICULTY, MINERATE }= require('../config');

class Block {
	constructor(timestamp, lastHash, hash, data, nonce, difficulty)	{									//Used to access attributes of the class block
		this.timestamp=timestamp;													//this used to bind the input attributes with the class. this is used to access the current value of the attributes. Assigning curr values to input variables
		this.lastHash=lastHash;
		this.hash=hash;
		this.data=data;
		this.nonce=nonce;
		this.difficulty=difficulty || DIFFICULTY;
	}			

	toString(){											//Return what the specific instance of the class actually look like. We combine them into one string using template string which is used with ` ` in which data can be inserted with $
		return ` Block -
		timestamp: ${this.timestamp}
		LastHash:  ${this.lastHash.substring(0,10)} 		
		Hash: 	   ${this.hash.substring(0,10)}
		Nonce:     ${this.nonce}
		Data: 	   ${this.data}
		DIFFICULTY:${this.difficulty } `;										
		}
				 									//Static means it can be accessed without instance of a class
	static genesis(){
		return new this('Genesis time', '----', 'f1r45-ki9', [], DIFFICULTY)		//this is the function and represents the class. []-empty array
	

	}

	static mineBlock(lastBlock, data){							//lastBlock from which it needs hash and its data
		let hash, timestamp;										
		const lastHash=lastBlock.hash;							//Storing hash value of last block
		let { difficulty }= lastBlock;
		let nonce=0;
		do{
			nonce++;
			timestamp=Date.now();									//now return the no. of ms passed since jan 1st 1970
			difficulty=Block.adjustDifficulty(lastBlock, timestamp);
			hash=Block.hash(timestamp, lastHash, data, nonce, difficulty);
		}while(hash.substring(0, difficulty)!== '0'.repeat(difficulty));
		//const hash="todo-hash";									//dummy hash used initially

		return new this(timestamp, lastHash, hash, data, nonce, difficulty);

	}		
	static hash(timestamp, lastHash, data, nonce, difficulty){
		return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();		//We combine them into one string using the ES6 template string ` `. SHA256 returns object. So we use toString to get its string representation.

	}

	static blockHash(block){
		const {timestamp, data, lastHash, nonce, difficulty} = block;					//Destructuring. We take the timestamp, data and lastHah from the block object
		return Block.hash(timestamp, lastHash, data, nonce, difficulty);						//returning the calculated hash value
	}

	static adjustDifficulty(lastBlock, currentTime){
		let {difficulty}= lastBlock;
		 difficulty=lastBlock.timestamp+ MINERATE> currentTime ? difficulty+1:  difficulty-1;
		 return difficulty;
	}												
}	

module.exports=Block;											//To share Block