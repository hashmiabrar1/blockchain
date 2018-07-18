//1)Setting up peer to peer server which makes sure that the first bc app/node can open a web socket server

const Websocket=require('ws');		//Import ws module
const P2P_PORT=process.env.P2P_PORT || 5001;							//Starts a p2p server on the port no. given

const peers= process.env.PEERS ? process.env.PEERS.split(',') : [];			//Checking if process.env.PEERS exists. split here returns an array of all the web sockets displayed in line 7 within an array and the addresses as elements otherwise sets it to an empty array
//PEERS is an environment variable

//$HTTP_PORT=3002 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev
/*We give the entire string of ws addresses to PEERS and run it */

class P2pServer{
	constructor(blockchain){										//takes a blockchain object as input
	this.blockchain=blockchain;										//Assigning a blockchain object to this class and set it to the given blockchain input
	this.sockets=[];													//Array to store list of connected web sockets that will end up connecting to this

	}

	listen(){																//used to create and start server
		const server=new Websocket.Server({ port : P2P_PORT });  				//Server is predefined method
		server.on('connection', socket=>this.connectSocket(socket))										//on is an eventListener which listens to incoming messages sent to the socket server and creates an obj socket. First argument is the event we're listening for. We can fire some code(callback function) whenever a socket(object) connects to this server.
		
		this.connectToPeers();													//Later instances of peers trying to connect

		console.log(`Listening for p2p connection on: ${P2P_PORT}`);																		//connectSocket does the job of pushing the socket to the array of sockets 
		}


		connectToPeers(){
			peers.forEach(peer=>{
				//ws://localhost:5001								//this is the Web socket server. Users are conencted as a peer. Address of the peer
				const socket=new Websocket(peer);					//new websocket object by passing peer address

			socket.on('open', ()=>this.connectSocket(socket));		//Connecting to socket we created
																	//Send the message event containing the blockchain object to the sockets we are connected with
			});
		}
		
		connectSocket(socket){												//Pushing to sockets array
			this.sockets.push(socket);
			console.log('Socket connected');

			this.messageHandler(socket);

			this.sendChain(socket);
			

		}													

		messageHandler(socket){											//Preparing sockets to receive the messages event. Parameter is the socket object
			socket.on('message', message=>{								//First param is a string which is the event we want to handle
				const data=JSON.parse(message);									//data we receive is Json string so converting it
				//console.log('data',data);
				this.blockchain.replaceChain(data);						//Replacing chain with longer chain
				
			});										
		}

		sendChain(socket){
			socket.send(JSON.stringify(this.blockchain.chain));			//sending to every socket connected to in the connectSocket function. Argument is string mssg to send. The chain is an object so we convert it to JSON string
		}

		syncChains(){												//Its goal is to send the updated blockchain of the current ins†ance to all of the socket peers
			this.sockets.forEach(socket=> this.sendChain(socket));							//Running for each socket object in the sockets array. We use send chain to each socket

			}
	

	}
	module.exports=P2pServer;