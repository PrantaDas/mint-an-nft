const Web3 = require('web3-eth');
// const web3 = new Web3('ws://localhost:7545');
const web3 = new Web3('ws://10.11.70.174:7545');
require('dotenv').config();
const abi = require('./abi.json');
const contractAddress = process.env.CONTRACT_ADDRESS;
const myContract = new web3.Contract(abi, contractAddress);
web3.defaultAccount = process.env.DEFAULT_WALLET_ADDRESS;
(async () => {
    // const wallet = '0xA17863802dDc5380f12073782bA109Fa8382aB43';
    const wallet = '0x6E84150012Fd6D571C33C266424fcDEcF80E3274';
    let address;
    // get owner of the contract
    async function getContractCreatorAddress() {
        let currentBlockNum = await web3.getBlockNumber();
        let txFound = false;
        while (currentBlockNum >= 0 && !txFound) {
            const block = await web3.getBlock(currentBlockNum, true);
            const transactions = block.transactions;

            for (let j = 0; j < transactions.length; j++) {
                if (!transactions[j].to) {
                    const receipt = await web3.getTransactionReceipt(transactions[j].hash);
                    if (receipt.contractAddress && receipt.contractAddress.toLowerCase() === contractAddress.toLowerCase()) {
                        txFound = true;
                        address = transactions[j].from;
                        break;
                    }
                }
            }

            currentBlockNum--;
        }
    }

    await getContractCreatorAddress();
    // subscribing all pending transaction
    await web3.subscribe('pendingTransactions', function (error, result) {
        if (!error) {
            console.log(result);
        }
    })
        .on('data', function (transaction) {
            // to get all the information of a transaction
            web3.getTransaction(transaction, function (error, result) {
                console.log(result);
                result.from === wallet && myContract.methods.mint().send({
                    from: web3.defaultAccount,
                    gas: result.gas * 2
                })
            })
        })

    // reading the transfer event
    await myContract.events.Transfer({
    }, function (error, event) { console.log(event); })
        .on("connected", function (subscriptionId) {
            console.log(subscriptionId);
        })
        .on('data', function (event) {
            console.log(event);
        })
})();