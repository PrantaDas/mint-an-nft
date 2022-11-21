const Web3 = require('web3-eth');
const web3 = new Web3('ws://localhost:7545')
require('dotenv').config();
const abi = require('./abi.json');
const contractAddress = process.env.CONTRACT_ADDRESS;
const myContract = new web3.Contract(abi, contractAddress);
web3.defaultAccount = process.env.DEFAULT_WALLET_ADDRESS;
(async () => {
    const wallet = '0xA17863802dDc5380f12073782bA109Fa8382aB43';
    await web3.subscribe('pendingTransactions', function (error, result) {
        if (!error) {
            console.log(result);
        }
    })
        .on('data', function (transaction) {
            web3.getTransaction(transaction, function (error, result) {
                console.log(result);
                result.from === wallet && myContract.methods.mint().send({
                    from: web3.defaultAccount,
                    gas: result.gas * 2
                })

            })
        })
    await myContract.events.Transfer({
    }, function (error, event) { console.log(event); })
        .on("connected", function (subscriptionId) {
            console.log(subscriptionId);
        })
        .on('data', function (event) {
            console.log(event);
        })
})();