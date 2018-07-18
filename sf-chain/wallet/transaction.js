const ChainUtil=require('../chain-util.js');

class Transaction{
	constructor(){
		this.id=ChainUtil.id();
		this.input=null;
		this.output=[];															//Displays how much sender wants to send and how much sender will have after Transaction 
	}

	update(senderWallet, recepient, amount){										//For multiple transaction
		const senderOutput= this.output.find(output=> output.address=== senderWallet.publicKey);

		if(amount> senderWallet.amount){										//senderWallet.amount is the balance
			console.log(`Amount ${amount} is greater than balance`);
			return;
		}

		senderOutput.amount = senderOutput.amount- amount;							//updating senders balance
		this.output.push({ amount, address:recepient})
		Transaction.signTransaction(this, senderWallet);							//Updating input by sending Transaction object and senderWallet object

		return this;
	}


//We need to return an instance of output.
	static newTransaction(senderWallet, recepient, amount){								//Senders wallet contains balance, public key. Receipient is Receipient address
		const transaction= new this();													//this refers to Transaction class
		if( amount > senderWallet.balance ){
			console.log(`Amount ${amount} exceeds balance`);
			return;
		}

		transaction.output.push([																		//There are two outputs. one for sender and other for receiver
			{amount: senderWallet.balance - amount, address: senderWallet.publicKey},				//Output has 1)senders remaining balance and his address. 2)Receivers Received money and address of receiver
			{amount, address: recepient}
			]);

		Transaction.signTransaction(transaction, senderWallet);

		return transaction;
	}

	static signTransaction(transaction, senderWallet){
		transaction.input={
			timestamp: Date.now(),
			amount: senderWallet.balance,
			address:senderWallet.publicKey,
			signature: senderWallet.sign(ChainUtil.hash(transaction.output))				//First message digest is created then signature
		}

	}

	static verifyTransaction(transaction){
		ChainUtil.verifySignature(												//Sending public key, signature and hash of data(senders and receivers address and balance of sender, amount to be transferred)
			transaction.input.address,
			transaction.input.signature,
			ChainUtil.hash(transaction.output));
	}
}

module.exports=Transaction;