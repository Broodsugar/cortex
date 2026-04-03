# Credit Service

The Credit Service tracks credit balances and enforces the data economy. Every data transfer on the network has a cost, paid in credits by the initiator and earned by the sender and receiver.

Credits are acquired by burning $AUKI tokens (via the Mint) and can be spent on network services or redeemed for $AUKI from the Reward Pool at any time. The Credit Service is the settlement layer — it handles who gets paid, when charges are committed, and how balances reconcile across nodes that may not fully trust each other.

## Open design questions

The credit lifecycle has solid foundations (credits as the usage unit, initiator pays, recruited providers earn through availability and task payments) but several settlement details are still unresolved:

- Pricing units — no table or formula yet for per-query, per-byte, or per-capability costs
- Who receives payment for each operation type
- When settlement happens and how partial failures are handled
- How node identity and wallet authority relate during payment
- How the "credits can only be sent to staked nodes" restriction interacts with Discovery Service billing

See the [auki-sdk status doc](../../auki-sdk/status/unknown/credit-spend-settlement-and-pricing.md) for the full analysis.
