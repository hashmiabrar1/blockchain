const Transaction= require('./transaction');
const Wallet=require('./index');

describe('Transaction', ()=>{
	let transaction, wallet, recepient, amount;
	beforeEach(()=>{
		wallet=new Wallet();
		amount=50;
		recepient='r3c1p13nt';									//Leetspeak method 
		transaction=Transaction.newTransaction(wallet, recepient, amount);
	});

	it('outputs the `amount` subtracted from wallet balance',()=>{
		expect(transaction.output.find(output=>output.address===wallet.publicKey).amount)					//First we are matching the address of sender from output array of obj and then we check if the amount corresponding to the address is balance-amount 
			.toEqual(wallet.balance-amount);
	});

	it('outputs the `amount` added to recepient',()=>{
		expect(transaction.output.find(output=>output.address===recepient).amount)					//First we are matching the address of recepient from output array of obj and then we check if the amount corresponding to the address is amount 
			.toEqual(amount);
	});

	describe('transacting with an amount that exceeds the balance', () => {
    beforeEach(() => {
      amount = 50000;
      transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('does not create the transaction', () => {
      expect(transaction).toEqual(undefined);
    });

    it('inputs the balance of the wallet', () => {
    expect(transaction.input.amount).toEqual(wallet.balance);
  });
});
