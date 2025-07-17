# Full Stack Fund Me DApp

This project is a decentralized application (DApp) that allows users to fund a smart contract via a frontend interface using MetaMask. It consists of:

- **Frontend**: A simple HTML/JavaScript application that interacts with the smart contract.
- **Backend**: A Hardhat-based smart contract development environment using Solidity.

---

## Table of Contents

- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Deploy to Local Network](#deploy-to-local-network)
- [Deploy to Testnet (Sepolia)](#deploy-to-testnet-sepolia)
- [Scripts](#scripts)
- [Testing and Gas Reports](#testing-and-gas-reports)
- [Linting & Formatting](#linting--formatting)
- [Verifying Contracts](#verifying-contracts)
- [Thank You](#thank-you)

---

## Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [MetaMask](https://metamask.io/) browser extension
- Optional: [Gitpod](https://gitpod.io/) for cloud-based development

---

## Getting Started

### Clone This Monorepo

```bash
git clone https://github.com/AbdulAhad-2005/fund-me-fullstack.git
cd fund-me-fullstack
```

The directory structure will look like:

```
fund-me-fullstack/
│
├── frontend/        # html-fund-me
└── backend/         # hardhat-fund-me
```

---

## Frontend Setup (`frontend/`)

### Run Locally

```bash
cd frontend
yarn
yarn http-server
```

Or simply open `index.html` directly in the browser, or use VS Code's “Open with Live Server”.

### Connect MetaMask

Make sure your MetaMask is connected to:

- The correct testnet (e.g., Sepolia)
- Or your local Hardhat network (Chain ID: `31337`) using an imported account

### Fund Transaction

1. Ensure the deployed contract address is added in `constants.js`
2. Click **Connect Wallet**
3. Enter an amount and click **Fund**

---

## Backend Setup (`backend/`)

```bash
cd backend
yarn
```

### Deploy Locally

```bash
yarn hardhat node    # Start a local Hardhat chain
```

In a new terminal:

```bash
yarn deploy          # Deploys to local network
```

### Deploy to Sepolia Testnet

1. Add your environment variables to `.env`:

```env
PRIVATE_KEY=your_private_key
SEPOLIA_RPC_URL=https://eth-sepolia.example
ETHERSCAN_API_KEY=your_etherscan_key
COINMARKETCAP_API_KEY=your_coinmarketcap_key
```

2. Run:

```bash
yarn deploy --network sepolia
```

---

## Scripts

- Fund contract: `yarn hardhat run scripts/fund.js`
- Withdraw: `yarn hardhat run scripts/withdraw.js`

---

## Testing and Gas Reports

```bash
yarn test             # Runs unit tests
yarn coverage         # Shows test coverage
```

### Gas Estimation

Outputs `gas-report.txt` with estimates. To show cost in USD, add `COINMARKETCAP_API_KEY` to `.env`.

---

## Verifying Contracts

```bash
yarn hardhat verify --constructor-args arguments.js DEPLOYED_CONTRACT_ADDRESS
```

Requires `ETHERSCAN_API_KEY` in your `.env`.

---

## Linting & Formatting

```bash
yarn lint             # Check issues
yarn lint:fix         # Auto-fix issues
yarn format           # Format code
```

---

## Thank You

Thanks for checking out this full stack blockchain project. If you encounter issues, feel free to raise them on [GitHub](https://github.com/AbdulAhad-2005).