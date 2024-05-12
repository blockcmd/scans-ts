"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Etherscan = void 0;
const MAINNET_URL = "https://api.etherscan.io/api";
const SEPOLIA_URL = "https://api-sepolia.etherscan.io/api";
class Etherscan {
    constructor(apiKey, rateLimit) {
        this.apiKey = apiKey;
        this.rateLimit = rateLimit;
    }
    async getAccounts(address) {
        // wait for 0.5 seconds before making the request
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (Array.isArray(address)) {
            address = address.join(",");
        }
        const url = `https://api.etherscan.io/api?module=account&action=balancemulti&address=${address}&tag=latest&apikey=${this.apiKey}`;
        const response = await fetch(url);
        return response.json();
    }
    async getERC20AccountBalance(address, contractAddress) {
        // wait for 0.5 seconds before making the request
        await new Promise((resolve) => setTimeout(resolve, 300));
        const url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${this.apiKey}`;
        const response = await fetch(url);
        return response.json();
    }
}
exports.Etherscan = Etherscan;
