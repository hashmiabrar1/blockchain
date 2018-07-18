const ChainUtil=require('../chain-util.js');
const { INITIAL_BALANCE }= require('../config');


class Wallet{
	constructor(){
		this.balance=INITIAL_BALANCE;
		this.keyPair=ChainUtil.genKeyPair();												//Generates keyPair object which generates keys
		this.publicKey=this.keyPair.getPublic().encode('hex');											//Returns public key
	}

	toString(){
		return ` Wallet- 
		publicKey: ${this.publicKey.toString()}
		balance:   ${this.balance} `
	}

	sign(dataHash){
		return this.keyPair.sign(dataHash);							//Signing with private key i.e creating signature
	}
}

module.exports= Wallet;