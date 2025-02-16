# html-fund-me

# Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you've installed it right if you can run:
    - `git --version`
- [Metamask](https://metamask.io/)
  - This is a browser extension that lets you interact with the blockchain.
- [Nodejs](https://nodejs.org/en/)
  - You'll know you've installed nodejs right if you can run:
    - `node --version` And get an ouput like: `vx.x.x`
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) instead of `npm`
  - You'll know you've installed yarn right if you can run:
    - `yarn --version` And get an output like: `x.x.x`
    - You might need to install it with npm

### Optional Gitpod

If you can't or don't want to run and install locally, you can work with this repo in Gitpod. If you do this, you can skip the `clone this repo` part.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#github.com/AbdulAhad-2005/html-fund-me)

# Quickstart

1. Clone the repo

```
git clone https://github.com/AbdulAhad-2005/html-fund-me
cd html-fund-me
```

2. Run the file.

You can usually just double click the file to "run it in the browser". Or you can right click the file in your VSCode and run "open with live server".

Optionally:

If you'd like to run with prettier formatting, or don't have a way to run your file in the browser, run:
```
yarn
yarn http-server
```

# Execute a transaction

If you want to execute a transaction follow this:

Make sure you have the following installed:

1. You'll need to open up a second terminal and run:

```
git clone https://github.com/AbdulAhad2005/hardhat-fund-me
cd hardhat-fund-me
yarn
```
if you want to fund a contract deployed locally on your computer, then run this command on the second terminal
```
yarn hardhat node
```
This will deploy a sample contract and start a local hardhat blockchain.

else, if you are deploying on an actual testnet or mainnet, then you should run this command
```
yarn hardhat deploy --network <network name>
```
This will deploy a sample contract but this time on an actual testnet like sepolia. Metamask should pop up to ask to pay the fee to deploy this contract. Once the transaction is confirmed, your contract will be deployed and also verified.


2. Update your `constants.js` with this new contract address.

In your `constants.js` file, update the variable `contractAddress` with the address of the deployed "FundMe" contract. You'll see it near the top of the hardhat output.

3. (only if using local hardhat blockchain, if not just click "Connect Wallet" button you should see metamask pop up prompting you to connect to this site. Confirm to connect your metamask wallet.)
Connect your [metamask](https://metamask.io/) to your local hardhat blockchain.

In the output of the above command, take one of the private key accounts and [import it into your metamask.](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account)

Additionally, add your localhost with chainid 31337 to your metamask.

> **PLEASE USE A METAMASK ACCOUNT THAT ISNT ASSOCIATED WITH ANY REAL MONEY.**
> I usually use a few different browser profiles to separate my metamasks easily.

5. Reserve the front end with `yarn http-server`, input an amount in the text box, and hit `fund` button after connecting

# Thank you!
