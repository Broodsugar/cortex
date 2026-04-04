economy

# Protocol Economy

## Creating a DePIN economy

Although decentralized physical infrastructure networks (DePIN) can be deployed on vast, even global `substrates`, they always have a knowable, finite supply of resources. When dealing with the exchange and trade of finite resources, it is important to have the resources' value be represented by something that has a finite supply of its own.

As a decentralized machine perception network, the limited resources of the AUKI posemesh are things like data, storage capacity, compute power, and battery. Actors within the posemesh are looking to preserve some of their scarce resources like storage and battery, and are therefore willing to pay for other participants to provide those resources for them.

As with any finite resource, the demand for the resource will impact its market price. The more participants vie for the limited resource pool, the more expensive each unit resource becomes.

One of the challenges with decentralized physical infrastructure networks that have a native token is how to maintain stable provisioning and pricing. If rewards for participating are paid out in the native token, providers may find that their work is not sufficiently compensated when the token price is low. This will in turn lead to them leaving the service, reducing the provisioning of the network.

The same is also true on the demand side. If the services are paid for with the native token, with prices denominated in the token, the cost of the service becomes unpredictable and the service becomes unreliable and unattractive to builders.

The AUKI posemesh uses an innovative *burn-credit-mint* economy that allows for the scarce resources of service and data to be exchanged at a predictable price unaffected by token price fluctuations.

Another common complication for DePIN projects is the *cold start* problem. There will be no demand for the service before it is reliably provided - but the network cannot sustainably afford to pay for overprovisioning. Simply put, no one wishes to supply service before there is demand, and there can be no demand before there is supply.

To allow for early provisioning, the network must disproportionately reward its early supply-side participants. It may even be necessary to incentivize early demand-side participants to use the network instead of its competing alternatives. Since no network can sustainably reward both supply and demand, network effects become crucial.

Network effects refer to the phenomenon where the value of the service increases as more people engage with it, leading in turn to increased supply of service and greater value for all participants.

The AUKI posemesh protocol requires participants to stake a reputation in the native $AUKI token. This reputation is token-denominated, meaning it is cheaper to participate when the token price is low. Rational DePIN operators that believe that there is future demand for the service will choose to participate early, so as to reduce the cost of joining the network when the rewards become compelling.

The AUKI posemesh rewards are also token-denominated, meaning rewards increase when the service and participation is in higher demand. Rational DePIN operators may choose to hold their token earnings so that they can continue to earn rewards when demand is higher, or sell their tokens at a higher price to allow new participants to stake into the network instead.

By allowing the *service price* to be dollar-denominated while making protocol participation and rewards token-denominated, the posemesh economy addresses the common challenges faced by other DePIN projects. It's a design tailor-made to allow for the bootstrapping of civilization-scale infrastructure owned and operated by the people.

## The Burn-Credit-Mint Mechanism

<figure><img src="https://4121179481-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FxBgN6FfM68MRDzf36wV7%2Fuploads%2F3BsAXxBueNPEmBRgoqSM%2FTokenomics.png?alt=media&#x26;token=64661bd6-c4c6-42eb-b582-b2873aa9efd3" alt=""><figcaption></figcaption></figure>

In the AUKI posemesh economy, supply-side providers *(operators)* make some their resources available to the network in exchange for `participation rewards` and `performance rewards`. The network can in turn use these resources to provide a service to the demand-side participants *(consumers),* typically app or hardware developers.

For the consumer to be able to purchase services from the posemesh they must first send an appropriate dollar-denominated amount of $AUKI tokens to a burn contract. In exchange, the participant's `organization` will be granted an offchain credit balance with the posemesh, representing a claim on pre-purchased services. These credits are non-transferable, and can be consumed by the organization's participants over time.

Each burn results in an immediate deflationary mint that goes into a reward pool. As consumers spend their credits on services, the reward pools issue tokens to the supply participants who provided their resources.

The more credits are spent by the consumer on a particular type of service, the more rewards will be earned by the participants supplying the data and resources. The rewards are paid out in the $AUKI token from the reward pool, which was previously replenished by the deflationary mint at the time of the burn.

{% hint style="info" %}
The burn cost of creating credits is dollar-denominated.
{% endhint %}

{% hint style="info" %}
The price of service is credit-denominated.
{% endhint %}

{% hint style="info" %}
The service rewards are token-denominated.
{% endhint %}

## The Deflationary Mint

Whenever consumers burn $AUKI tokens the protocol creates smaller amount of new tokens and places them in a reward pool. This deflationary mechanism means that fewer tokens are paid out to the service providers than the consumers initially burned. Over time, the deflation rate is adjusted asymptotically towards 0 as the total supply of tokens approaches 50% of the initial mint at network launch.

The closer the `total supply` is to half of `initial supply`, the closer the burn/mint ratio moves to 1:1. To ensure its ability to continuously invest in protocol improvements and necessary provisioning, the protocol takes a small (as of yet undetermined) percentage of the mint.

This asymptotic reduction of deflation creates extra incentive for early adopters to hold their tokens for a longer period, as deflation rates are the highest when the protocol is gaining its initial traction.

## The Foundation & Treasury

The Posemesh Foundation exists to manage the token economy and posemesh network until such a time that the network is sufficiently decentralized that it can sustain itself independently. The Foundation's mandate is to establish a universal spatial computing protocol and decentralized machine perception network, and to that end they have created the token economy and its policies, and oversee the gradual open sourcing of the protocol.

To ensure that the Foundation acts in the best interests of the network, they are granted a substantial portion of the initial supply as a `treasury` that it uses to accelerate network growth on both the demand and supply side.

By giving the Foundation a treasury, the network creates an incentive for the Foundation to act to increase the demand for the service and the token. The more desirable the service and its token becomes, the greater the market value of the treasury becomes.

The treasury is vested over a six year period, making sure that the Foundation has a long-term perspective on protocol growth.

In the service of their mandate, the Foundation may issue grants to application developers to increase demand generation, or provide participation rewards to service providers for healthy overprovisioning in regions of interest to the network.

The treasury is gradually replenished through a small tax on all mints.

## Game theory implications

When the token price is low, consumers end up burning a greater amount of tokens, accelerating the deflation of the total supply. When the token price is high, consumers burn fewer tokens for the same amount of credits, meaning fewer (but more valuable) tokens are paid out to providers.

If price stability is a priority for the consumer, the rational service consumer will burn tokens immediately after purchase. As long as there is no lag between purchase and burn, the service consumer has complete overview of the cost of interacting with the posemesh.

Since reputations are token-denominated, and locked for the duration of the smart contract between the participant and the posemesh, operators are implicitly making a prediction that demand for the posemesh will be stable or increase over the contract period.

When the token price increases, so does the value of the existing rewards pool - but the upfront cost of joining the posemesh and staking a reputation is also greater. This creates an emergent prediction market where rational operators will buy tokens when the price is low to make sure they can afford to act as operators when rewards are high.

If the rational operator believes there is insufficient demand for the service, or that demand will go down, they will choose not to stake their tokens, or even put them back into circulating supply.

This way, operators collectively and implicitly balance the provisioning of the posemesh service without a central authority. If there are too many operators compared to demand, rewards will be too low to incentivize further provisioning.

{% hint style="warning" %}
The credit service is currently managed offchain, to allow for real-time credit deductions and collaboration between peers.

While we strive for the posemesh to be fully decentralized, we have not yet found an onchain real-time solution for the credit service. Moving forward, this will be a key focus for the project.
{% endhint %}
