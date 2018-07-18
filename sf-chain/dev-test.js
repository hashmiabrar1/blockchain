 //const Block=require('./Block');				//./ references to local block file that is in the same directory to get block class that was exported

/* 
const block=new Block('foo', 'bar', 'zoo', 'baz');				//Creating instance of class and sending data as parameters as constructor is executed when obj is created of that class

1)console.log(block.toString());
2)console.log(Block.genesis().toString());   			//called with classname..toString used for its string representation
*/

/*
const fooBlock=Block.mineBlock(Block.genesis(),'foo');			//foo is the data 
console.log(fooBlock.toString());								//3)
*/


/*
const Blockchain=require('./blockchain');

const bc= new Blockchain();

for(let i=0; i<10; i++){
	console.log(bc.addBlock(`foo ${i}`).toString());
}
*/

const Wallet= require('./wallet');
const wallet=new Wallet();								//New instance of Wallet class

console.log(wallet.toString());