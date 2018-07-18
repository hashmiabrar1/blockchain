//Test to check is block is successfully added to chain
//Unit testing
const Blockchain=require('./index');				
const Block=require('./block');

describe('Blockchain',()=>{							//Blockchain is the class we want to test
	let bc,bc2;										//Variable
	beforeEach(()=>{								//beforeEach is run before each test in a describe
		bc=new Blockchain();						//Instance of the blockchain
		bc2=new Blockchain();						//@nd instance of blockchain
	});
	it('starts with genesis block',()=>{
		expect(bc.chain[0]).toEqual(Block.genesis());

	});

	it('adds a new block',()=>{
		const data='foo';							//Fake Data that block will add
		bc.addBlock(data);							//addBlock is a method in class Blockchain
	
		expect(bc.chain[bc.chain.length-1].data).toEqual(data);		//Checking if data of last block is equal to fake data
	});	

	it('validates a valid chain',()=>{
		bc2.addBlock('foo');										//add a block to the bc2 Blockchain instance

		expect(bc.isValidChain(bc2.chain)).toBe(true);				//isValidChain returns true or false. We expect it to be true
	});

	it('invalidates a chain with an incorrect genesis block', ()=>{
		bc2.chain[0].data='Bad boy';									//Genesis block is incorrect as we gave different data to bc2 instance
		expect(bc.isValidChain(bc2.chain)).toBe(false);				//We expect it to be false

	});

	it('invalidates a corrupt chain which may have a bad block',()=>{
		bc2.addBlock('foo');
		bc2.chain[1].data='Not foo';										//Corrupting the data(foo block)

		expect(bc.isValidChain(bc2.chain)).toBe(false);
	});

	it('replaces the chain with a valid chain',()=>{				//with a longer chain
		bc2.addBlock('foo');										//Adding a block to the second blockchain
		bc.replaceChain(bc2.chain);									//If chain of bc2 is longer chain of bc is repleaced with it in the function

		expect(bc.chain).toEqual(bc2.chain);						//We check if the chain of first instance is equal to the chain of second instance	
	});

	it('does not replace the chain with one of less than equal length',()=>{
		bc.addBlock('foo');																//chain of bc has two blocks now
		bc.replaceChain(bc2.chain);														//chain of bc2 has only genesis block
		expect(bc.chain).not.toEqual(bc2.chain);
		
	})



});