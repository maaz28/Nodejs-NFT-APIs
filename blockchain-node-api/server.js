require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const Web3 = require('web3');
const CONTRACT_ABI = require('./config');
const CONTRACT_ADDRESS = require('./config');

const HDWalletProvider = require("@truffle/hdwallet-provider");
console.log(process.env.PRIVATE_KEY)
const privateKeys = process.env.PRIVATE_KEY || ""
const walletAPIUrl = `https://rinkeby.infura.io/v3/`+process.env.INFURA_KEY
const provider = new HDWalletProvider(
  privateKeys.split(','),
  walletAPIUrl
);
// const web3 = new Web3API(provider)

app.use(cors());
app.use(express.json());

if (typeof Web3 !== 'undefined') {
	// var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/f0df2f948f38472da31dab77fb720513'));
	var web3 = new Web3(provider);
} else {
	var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
}

// const LMS = contract(artifacts);

// LMS.setProvider(web3.currentProvider);

	const contractNft = new web3.eth.Contract(CONTRACT_ABI.CONTRACT_ABI, CONTRACT_ADDRESS.CONTRACT_ADDRESS);
	// const lms = await LMS.deployed();

	routes(app, contractNft, web3);
	app.listen(process.env.PORT || 3001, () => {
		console.log('listening on port '+ (process.env.PORT || 3001));
	});
