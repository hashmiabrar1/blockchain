const Block=require('./Block');				//To use Block class

class Blockchain{
	constructor(){
		this.chain=[Block.genesis()];				//chain is given an array starting with genesis block. Whenever an instance is created, its chain is assigned the genesis block
	}

	addBlock(data){								//Used to add blocks and parameter is the data we want to add
		const lastBlock=this.chain[this.chain.length-1];  		//Used to grab the block at the end of the chain i.e at the last index of this.chain
		const block=Block.mineBlock(lastBlock,data); 			//mineBlock is used to add more blocks based on prev block and data for curr block
		this.chain.push(block);									//Pushing the block created above into the array
	
		return block;
	}		
 
	isValidChain(chain){										//Checking validity of chain. COMPARING ELEMENTS OF INCOMING CHAIN AND GENESIS BLOCK FIRST
		if(JSON.stringify(chain[0]) != JSON.stringify(Block.genesis())) 
			return false;
		for(let i=1; i<chain.length; i++)
		{
			const block=chain[i];
			const lastBlock=chain[i-1];

			if(block.lastHash !== lastBlock.hash || 				//If lastHash is equal to last blocks hash
				block.hash !== Block.blockHash(block))				//If data is tampered. blockHash is a function which generated hash for that block
				return false;
		}
		return true;
	}


	replaceChain(newChain){									//Replacing existing chain with new longer validchain
		if(newChain <= this.chain.length){
		//console.log('New chain isnt longer than current chain');
		return;
		}
		else if(!this.isValidChain(newChain))
		{
			//console.log('New chain isnt valid');
			return;
		}
		//console.log('Replaced blockchain with new chain');
		this.chain=newChain;

	}

}


module.exports=Blockchain;								//Exporting so that other files can access using require the Blockchain class