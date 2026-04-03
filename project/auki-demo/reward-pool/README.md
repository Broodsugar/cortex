# Reward Pool

The Reward Pool is a reserve of $AUKI tokens that backs all outstanding credits. It is the mechanism through which credits can be converted back into tokens.

## How it is funded

Every time a node burns $AUKI to acquire credits, the protocol mints new $AUKI tokens into the Reward Pool. The mint is always smaller than the burn — the deflation rate starts at 50% and falls linearly to 0% as supply contracts from 10bn to 5bn. The Auki Foundation treasury can also deposit $AUKI into the pool to bootstrap or incentivise network usage.

## Redemption

Any node holding credits can redeem them for $AUKI from the Reward Pool at any time. The redemption is **pro rata**:

> A node holding **X%** of all outstanding credits can claim **X%** of the tokens in the Reward Pool.

This is not a fixed exchange rate — it is a share of a pool. The dollar value of a credit in $AUKI terms depends on how many tokens are in the pool and how many credits are outstanding.

Spending credits on network services does not destroy them — it transfers them to the service provider. Only redemption removes credits from circulation.

## Why the pool exists

- **Service providers can cash out.** A node earning credits for serving data can redeem them for $AUKI and sell on the open market.
- **Credits have a floor value.** Because they are always redeemable against a real pool of tokens, credits cannot become worthless.
- **The system is self-balancing.** Heavy network usage means more burns, more mints into the pool, more tokens available for redemption. Light usage means fewer burns but also fewer credits outstanding.
