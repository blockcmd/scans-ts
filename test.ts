import { Etherscan } from './src/scans'
// For testing, I use config.ts file to store configurations like API key and test addresses
import { Config } from './config'

const etherscan = new Etherscan(Config.apiKey || "")

// Test getAccounts
etherscan.getAccounts(Config.test1)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });

// Test getAccounts for multiple addresses
etherscan.getAccounts(Config.test2)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });

