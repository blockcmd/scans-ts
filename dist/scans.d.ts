export declare class Etherscan {
    apiKey: string;
    rateLimit: number;
    constructor(apiKey: string, rateLimit: number);
    getAccounts(address: string | string[]): Promise<any>;
    getERC20AccountBalance(address: string, contractAddress: string): Promise<any>;
}
