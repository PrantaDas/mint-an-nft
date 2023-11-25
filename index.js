const Web3 = require('web3-eth');

/**
 * Create a new instance of the Web3 library, connecting to a WebSocket provider.
 * @type {Web3}
 */
const web3 = new Web3('ws://10.11.70.174:7545');

require('dotenv').config();
const abi = require('./abi.json');
const contractAddress = process.env.CONTRACT_ADDRESS;

/**
 * Create a new instance of a contract using the Web3 library.
 * @type {Contract}
 */
const myContract = new web3.Contract(abi, contractAddress);

/**
 * Set the default account for transactions.
 * @type {string}
 */
web3.defaultAccount = process.env.DEFAULT_WALLET_ADDRESS;

/**
 * An asynchronous function that fetches the creator's address of the smart contract.
 * @returns {Promise<void>}
 */
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

(async () => {
    const wallet = ''; // Specify the wallet address

    // Fetch the contract creator's address
    await getContractCreatorAddress();

    /**
     * Subscribe to all pending transactions and log the transaction data.
     * @param {Error} error - The error, if any.
     * @param {string} result - The result data of the subscription.
     */
    await web3.subscribe('pendingTransactions', function (error, result) {
        if (!error) {
            console.log(result);
        }
    })
        .on('data', function (transaction) {
            // Get all the information of a transaction
            web3.getTransaction(transaction, function (error, result) {
                console.log(result);
                // Check if the transaction is from the specified wallet and then execute the mint function
                result.from === wallet && myContract.methods.mint().send({
                    from: web3.defaultAccount,
                    gas: result.gas * 2
                });
            });
        });

    /**
     * Subscribe to the 'Transfer' event of the smart contract.
     * @param {Error} error - The error, if any.
     * @param {object} event - The event data.
     */
    await myContract.events.Transfer({}, function (error, event) {
        console.log(event);
    })
        .on("connected", function (subscriptionId) {
            console.log(subscriptionId);
        })
        .on('data', function (event) {
            console.log(event);
        });
})();
