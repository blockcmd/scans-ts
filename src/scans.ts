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

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getAccounts(address: string | string[]) {
    if (Array.isArray(address)) {
      address = address.join(",");
    }
    const url = `https://api.etherscan.io/api?module=account&action=balancemulti&address=${address}&tag=latest&apikey=${this.apiKey}`;
    const response = await fetch(url);
    return response.json();
  }

  async getERC20AccountBalance(address: string, contractAddress: string) {
    const url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${this.apiKey}`;
    const response = await fetch(url);
    return response.json();
  }
}
