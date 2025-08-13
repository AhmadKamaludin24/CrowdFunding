# 🚀 Crowd Funding DApp

A blockchain-based crowdfunding DApp that allows users to create and fund campaigns transparently and in a decentralized way.  
Built with **Vite** for the frontend and **Thirdweb** for smart contract integration.

---

## 📌 Features
- **Create Campaigns**: Users can create campaigns with a description, funding goal, and deadline.
- **Donate**: Anyone can contribute to a campaign using a Web3 wallet.
- **Wallet Integration**: Supports connecting wallets like MetaMask.
- **On-Chain Data**: All transactions and campaign data are stored on the blockchain.
- **Thirdweb Smart Contract**: Uses Thirdweb for easy contract deployment and interaction.

---

## 🛠️ Tech Stack
### Frontend
- [Vite](https://vitejs.dev/) – Fast build tool for modern frontend development.
- [React.js](https://reactjs.org/) – UI library for building interactive interfaces.
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for responsive design.

### Blockchain & Smart Contract
- [Thirdweb](https://thirdweb.com/) – Platform for deploying and interacting with smart contracts.
- [Ethers.js](https://docs.ethers.io/) – Library for Ethereum blockchain interaction.
- [MetaMask](https://metamask.io/) – Web3 wallet for user authentication and transactions.

---

## 📂 Project Structure
```bash
crowd-funding/
│
├── client/                  # Frontend (Vite + React + Tailwind)
│   ├── public/              # Public assets
│   ├── src/                 # Frontend source code
│   │   ├── assets/          # Images & icons
│   │   ├── components/      # UI components
│   │   ├── constants/       # Static data
│   │   ├── context/         # State management & hooks
│   │   ├── pages/           # App pages
│   │   └── utils/           # Helper functions
│   └── index.html
│
├── contracts/               # Solidity smart contracts
│   ├── CrowdFunding.sol
│   └── ...
│
├── scripts/                 # Deployment and interaction scripts
│
└── README.md
