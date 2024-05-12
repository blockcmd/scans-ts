import { Scans } from './src/scans'
// For testing, I use config.ts file to store configurations like API key and test addresses
import { Config } from './config'
import { Address } from './src/scans'

const scans = new Scans(Config.apiKey || "")

// Test getAccount
scans.getAccount(Config.test1 as Address)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });


// Test getAccounts for multiple addresses
scans.getAccounts(Config.test2 as Address[])
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });

