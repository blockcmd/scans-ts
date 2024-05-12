const MAINNET_URL = "https://api.etherscan.io/api";
const SEPOLIA_URL = "https://api-sepolia.etherscan.io/api";

interface AccountsRequest {
  module: string;
  action: string;
  address: string | string[];
  tag: string;
  apikey: string;
}

interface AccountsResponse {
  status: string;
  message: string;
  result: string;
}

export class Etherscan {
  apiKey: string; // Add apiKey from Etherscan
  rateLimit: number; // rateLimit as number of calls per second

  constructor(apiKey: string, rateLimit: number) {
    this.apiKey = apiKey;
    this.rateLimit = rateLimit;
  }

  async getAccounts(address: string | string[]) {
    // wait for 0.5 seconds before making the request
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (Array.isArray(address)) {
      address = address.join(",");
    }
    const url = `https://api.etherscan.io/api?module=account&action=balancemulti&address=${address}&tag=latest&apikey=${this.apiKey}`;
    const response = await fetch(url);
    return response.json();
  }

  async getERC20AccountBalance(address: string, contractAddress: string) {
    // wait for 0.5 seconds before making the request
    await new Promise((resolve) => setTimeout(resolve, 300));
    const url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${this.apiKey}`;
    const response = await fetch(url);
    return response.json();
  }
}