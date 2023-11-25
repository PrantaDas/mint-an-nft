# Web3 Ethereum Smart Contract Interaction

This project demonstrates interaction with an Ethereum smart contract using the Web3 library and Node.js. It includes functionalities to connect to a local Ethereum blockchain, subscribe to pending transactions, fetch the creator's address of a smart contract, and listen to the 'Transfer' event.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Functions](#functions)
- [Examples](#examples)
- [Contributing](#contributing)


## Introduction

The project showcases how to use the Web3 library to interact with an Ethereum smart contract. It includes sample code to connect to a local Ethereum blockchain, subscribe to pending transactions, fetch the creator's address of a smart contract, and listen to the 'Transfer' event and buy the desired `Token` before the targeted `wallet`

## Prerequisites

Before using this project, ensure you have the following prerequisites installed:

- Node.js: [Download Node.js](https://nodejs.org/)

## Installation

1. Clone the repository:

    ```bash
    git clone  https://github.com/PrantaDas/mint-an-nft.git
    ```

2. Change to the project directory:

    ```bash
    cd mint-an-nft
    ```

3. Install dependencies:

    ```bash
    npm install or yarn
    ```

## Usage

1. Set up your Ethereum blockchain (e.g., Ganache) and update the WebSocket provider address in the `web3` initialization:

    ```javascript
    const web3 = new Web3('ws://your-ethereum-node-ip:7545');
    ```

2. Specify the contract address and ABI in the `abi.json` file and update the `.env` file with the contract address and default wallet address.

3. Customize the `wallet` variable with the desired wallet address.

4. Run the script:

    ```bash
    node index.js
    ```

## Functions

- `getContractCreatorAddress()`: Fetch the creator's address of the smart contract.
- Subscription to pending transactions.
- Logging transaction data and executing the mint function if the transaction is from a specified wallet.
- Subscription to the 'Transfer' event of the smart contract.

## Examples

Check the `examples` directory for usage examples and sample scripts.

## Contributing

Feel free to contribute to the project by opening issues or submitting pull requests. Please adhere to the [Code of Conduct](https://docs.github.com/en/site-policy/github-terms/github-community-code-of-conduct).

