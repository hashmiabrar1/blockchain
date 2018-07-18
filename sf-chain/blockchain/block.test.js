const Block=require('./Block');				//To access block class. one dot for same directory and two to go prev directory


describe('Block',()=>{
	let data, lastBlock, block;
	beforeEach(()=>{									//beforeEach is run before each test in a describe
		data='bar';										//by declaring data, lastBlock and block as const here, they will be limited to the scope of beforeEach and not it, so we declare it above with let
		lastBlock=Block.genesis();
		block=Block.mineBlock(lastBlock,data);			//We have a local block
	});
	it('sets the `data` to match the input',()=>{
		expect(block.data).toEqual(data);								//Check block in line 8 with input in line 6 
	});      																//it is a test. Data attribute for that block class to match the given input when that block is created. '' shows its a special variable 
	it('sets the `lastHash` to match the hash of the last block', ()=>{
		expect(block.lastHash).toEqual(lastBlock.hash);						//Comparing hashes
	});

	it('generates a hash that matches the difficulty', ()=>{
		expect(block.hash.substring(0, block.difficulty).toEqual('0'.repeat(block.difficulty)));
		console.log(block.toString());
	})

	it('lowers the difficulty for slowly mined blocks', ()=>{
		expect(Block.adjustDifficulty(block, block.timestamp+360000))
		.toEqual(block.difficulty-1);
	})

	it('lowers the difficulty for slowly mined blocks', ()=>{
		expect(Block.adjustDifficulty(block, block.timestamp+1))
		.toEqual(block.difficulty+1);
	})
	

});



/*Insted of creating an instance for every it method we use beforeEach */