const EC= require('elliptic').ec 	 			//ec is inner object and EC is a class so to use its methods we need to create and instance
const ec= new EC('secp256k1');

const SHA256=require('crypto-js/sha256');

const uuidV1=require('uuid/v1');

class ChainUtil{
	static genKeyPair(){
		return ec.genKeyPair();										//Creates and returns key pair
	}

	static id(){
		return uuidV1();
	}

	static hash(data){														//Generates hash
		return SHA256(JSON.stringify(data)).toString();
	}

	static verifySignature(publicKey, signature, dataHash){							//Here public Key is used to verify signature and compare it with dataHash
		return ec.keyFromPublic(publicKey,'hex').verify(dataHash, signature);			// Import public key
	}

}

module.exports=ChainUtil;