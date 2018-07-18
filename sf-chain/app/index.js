const express= require('express');
const bodyParser=require('body-parser');
const Blockchain= require('../blockchain');	  //Importing blockchain folder for Blockchain class which we had exported. More info in notes 
const P2pServer= require('./p2p-server');

const HTTP_PORT= process.env.HTTP_PORT||3001;		//Notes

const app= express();						//app is assigned the result returned by calling express()
const bc= new Blockchain();					//new bc instance
const p2pServer= new P2pServer(bc);			// argument is blockchain which is with the local bc instance

app.use(bodyParser.json())			//Allows us to use json for post requests


app.get('/blocks',(req,res)=>{
	res.json(bc.chain);							//Server sends the blockchain to user in json format. Used to display the data on postman/browser
});

app.post('/mine',(req,res) =>{
	const block=bc.addBlock(req.body.data);				//Creates block with the data we enter using post in json file
	console.log(`Block was added: ${block.toString()}`);		//Displays new block thats added on the console and not on postman

	//Now to print the chain we need to direct it to the endpoint of get in line 14 ending with /blocks

	p2pServer.syncChains();								//Synchronizing after every addition of blocks


	res.redirect('/blocks');
});




app.listen(HTTP_PORT,()=>{ console.log(`Listening on port ${HTTP_PORT}`)})			//2md param is optional callback to print something 
p2pServer.listen();																	//Starts the web socket server

