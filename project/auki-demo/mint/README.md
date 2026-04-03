# Credit Mint

The Mint is a smart contract for burning dollar-denominated amounts of $AUKI tokens and issuing new credits to the burner. It is the on-ramp from the token economy into the credit economy.

## How it works

1. A node specifies a **dollar amount** to burn (e.g. $10)
2. The protocol calculates how many $AUKI tokens that corresponds to at the current price
3. Those tokens are **permanently destroyed** — removed from circulating supply
4. The node receives **credits equal to the dollar amount**

Burns are dollar-denominated: burning $10 worth of $AUKI always yields $10 worth of credits, regardless of the token's market price. This keeps service pricing stable.

## Deflationary mint

Every burn triggers a corresponding mint of new $AUKI tokens into the Reward Pool — but fewer tokens are minted than were burned. The deflation rate is a linear function of the current supply:

- Starts at **50%** when supply is 10bn
- Falls linearly to **0%** as supply contracts to 5bn
- The supply asymptotically approaches 5bn but never reaches it

```
d(S) = 0.5 * (S - 5bn) / 5bn
minted = burn_amount * (1 - d(S))
```

At 10bn supply, burning 100 tokens mints 50 into the pool and removes 50 permanently. At 7.5bn, burning 100 mints 75 and removes 25. Near 5bn, the mint approaches 1:1.
