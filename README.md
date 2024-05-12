# SCANS-TS
An asyncronous Typescript library for interacting with all known block explorers

## Getting started
You can install the library with
```bash
npm install @blockcmd/scans-ts
```

Then import and initialize the Scans object
```typescript
const scans = new Scans("INSERT_YOUR_API_KEY")
```

## Supported explorers
- `Etherscan`
- `Solana FM`