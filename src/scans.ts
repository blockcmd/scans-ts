const MAINNET_URL = "https://api.etherscan.io/api";
const SEPOLIA_URL = "https://api-sepolia.etherscan.io/api";

interface getAccountResponse {
  status: string;
  message: string;
  result: string;
}

interface getAccountsResponse {
  status: string;
  message: string;
  result: {
    account: string;
    balance: string;
  }[];
}

interface getNormalTransactionsResponse {
  status: string;
  message: string;
  result: {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    nonce: string;
    blockHash: string;
    transactionIndex: string;
    from: string;
    to: string;
    value: string;
    gas: string;
    gasPrice: string;
    isError: string;
    txreceipt_status: string;
    input: string;
    contractAddress: string;
    cumulativeGasUsed: string;
    gasUsed: string;
    confirmations: string;
  }[];
}

export class Etherscan {
  apiKey: string; // Add apiKey from Etherscan

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getAccount(
    address: string,
    tag: string = "latest"
  ): Promise<getAccountResponse> {
    if (!address) {
      throw new Error("Address is empty");
    }
    const network = MAINNET_URL;
    const url = `${network}?module=account&action=balance&address=${address}&tag=${tag}&apikey=${this.apiKey}`;
    const response = await fetch(url);
    return response.json();
  }

  async getAccounts(
    address: string[],
    tag: string = "latest"
  ): Promise<getAccountsResponse> {
    if (address.length === 0) {
      throw new Error("Address list is empty");
    }
    if (address.length > 20) {
      throw new Error("Address list is too long");
    }
    const network = MAINNET_URL;
    const url = `${network}?module=account&action=balancemulti&address=${address}&tag=${tag}&apikey=${this.apiKey}`;
    const response = await fetch(url);
    return response.json();
  }

  async getNormalTransactions(
    address: string,
    startblock: number = 0,
    endblock: number = 99999999,
    offset: number = 10,
    sort: string = "asc"
  ): Promise<getNormalTransactionsResponse> {
    const network = MAINNET_URL;
    const url = `${network}?module=account&action=txlist&address=${address}&startblock=${startblock}&endblock=${endblock}&offset=${offset}&sort=${sort}&apikey=${this.apiKey}`;
    const response = await fetch(url);
    return response.json();
  }

  async getInternalTransactions(address: string) {
    const network = MAINNET_URL;
    const url = `${network}?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=2702578&sort=asc&apikey=${this.apiKey}`;
    const response = await fetch(url);
    return response.json();
  }

  async getERC20AccountBalance(address: string, contractAddress: string) {
    const url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${this.apiKey}`;
    const response = await fetch(url);
    return response.json();
  }
}
