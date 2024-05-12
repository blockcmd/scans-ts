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
    methodId: string;
    functionName: string;
  }[];
}

interface getInternalTransactionsResponse {
  status: string;
  message: string;
  result: {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    from: string;
    to: string;
    value: string;
    contractAddress: string;
    input: string;
    type: string;
    gas: string;
    gasUsed: string;
    traceId: string;
    isError: string;
    errCode: string;
  }[];
}

interface getInternalTransactionByTxHashResponse {
  status: string;
  message: string;
  result: {
    blockNumber: string;
    timeStamp: string;
    from: string;
    to: string;
    value: string;
    contractAddress: string;
    input: string;
    type: string;
    gas: string;
    gasUsed: string;
    isError: string;
    errCode: string;
  }[];
}


export type Address = `0x${string}`;


export class Etherscan {
  apiKey: string; // Add apiKey from Etherscan


  // initialize the class with the API key
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }


  // Get single account balance
  async getAccount(
    address: Address,
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


  // Get multiple accounts in one request
  async getAccounts(
    address: Address[],
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


  // Get 'Normal Transactions' by Address
  async getNormalTransactions(
    address: Address,
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


  // Get 'Internal Transactions' by Address
  async getInternalTransactions(
    address: Address,
    startblock: number = 0,
    endblock: number = 99999999,
    offset: number = 10,
    sort: string = "asc"
  ): Promise<getInternalTransactionsResponse> {
    const network = MAINNET_URL;
    const url = `${network}?module=account&action=txlistinternal&address=${address}&startblock=${startblock}&endblock=${endblock}&offset=${offset}&sort=${sort}&apikey=${this.apiKey}`;
    const response = await fetch(url);
    return response.json();
  }


  // Get 'Internal Transactions' by Transaction Hash
  async getInternalTransactionsByTxHash(
    txhash: Address
  ): Promise<getInternalTransactionByTxHashResponse> {
    const network = MAINNET_URL;
    const url = `${network}?module=account&action=txlistinternal&txhash=${txhash}&apikey=${this.apiKey}`;
    const response = await fetch(url);
    return response.json();
  }


  // Get "Internal Transactions" by Block Range
  async getInternalTransactionsByBlockRange(
    startblock: number,
    endblock: number,
    page: number = 1,
    offset: number = 10,
    sort: string = "asc"
  ): Promise<getInternalTransactionsResponse> {
    const network = MAINNET_URL;
    const url = `${network}?module=account&action=txlistinternal&startblock=${startblock}&endblock=${endblock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${this.apiKey}`;
    const response = await fetch(url);
    return response.json();
  }

  async getERC20AccountBalance(address: string, contractAddress: string) {
    const url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${this.apiKey}`;
    const response = await fetch(url);
    return response.json();
  }


}

