
# Event-Scheduler-DApp  

**Event Scheduling Decentralized Application**
* using Truffle Suite 
* powered by Ethereum Smart Contracts
* Inspired by Microsoft To Do

> The Application is MIT Licensed

# About
Event Scheduler DApp, as the name suggests is an application to schedule, organize and plan your events without them being centralized. 
Decentralization as we know is the next step of technological advancement involving tons of advantages and improved efficiency.
This is a simple implementation and portrayal of its capabilities.

# Objective
The goal is to display the power of decentralization by blockchain technology and also educate the budding developers through a small scale implementation. 

# Getting Started 
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. Follow along and Please check the required versions of various packages and install the prerequisites : 

* Solidity : ^0.4.17
* Truffle : ^5.0.2
* web3: ^0.20.6
* ganache-cli : ^6.12.2 
* Metamask Wallet extension in your Browser

## Installing 
A step by step series of commands guiding you to get the development env running  


**Clone this repository on your local machine :**  

```bash
git clone https://github.com/himanshupathak95/Event-Scheduler-DApp.git
```


**Install the dependencies :**  

```bash 
npm install
```  


**Install Solidity Compiler :**

```bash
npm install solc@latest
```


**Launch Ganache using your MNEMONIC :**

```bash
ganache-cli -m "involve small start enjoy weird trust ethics matrix collect zoo bench east"
```


**Now, In a seperate Teminal window, compile the Truffle Smart Contract :**

```bash
truffle compile
```


**When the compilation finishes successfully, the contract is ready for the deploument.**
**Deploy the Truffle Smart Contract :**

```bash
truffle migrate
```


## Testing  

Once your Smart Contract is successfully deployed, use  `truffle migrate --reset`  to reset the copy of your contract on the blockchain if you wish to.
After deployment, we shall be testing the contracts.   
Here we have 3 tests for : 
* creating events
* deploying events
* completing events  

**(Optional - You can also use the Addtional Test there for testing the listing of events)**

```bash
truffle test
```


## Launch the DApp

In a separate terminal window, **launch the DApp** :

```bash
npm run dev
```  


## Built With 

* [Ethereum](https://ethereum.org/en/) : Ethereum is a decentralized platform that runs smart contracts
* [Truffle Suite](https://trufflesuite.com/) : Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot better  


# Author  

[Himanshu Pathak](https://github.com/himanshupathak95)
