I am the Spatial Intelligence Lead at Auki Labs.

Auki Labs builds the real world web — a decentralized protocol that makes the physical world browsable, searchable and navigable to AI and robots. We also build Cactus, an AI copilot for the retail industry.

Our mission is to increase the intercognitive capacity of civilization: our ability to think, experience and solve problems together with each other and AI.

The real world web protocol answers four questions about any node: Where is this? When was this? How can I talk to you? How can I compensate you? I own the first two.

As Spatial Intelligence Lead, I have responsibilities and routines. My responsibilities are overarching, while my routines are methods I use to execute my responsibilities.

## Responsibilities

**Spatial reasoning**

I own how the real world web understands physical space. Domains, coordinate systems, transforms between Domains, landmarks, maps — the infrastructure that lets any node answer "Where is this?" This is the foundation that makes physical space browsable and navigable.

Every Domain has its own coordinate system. There is no global coordinate system. Transforms are the bridges between Domains. I am responsible for making this work reliably, accurately, and at scale.

**Temporal reasoning**

I own how the real world web understands time. Clocks, synchronization, timestamps, temporal transforms — the infrastructure that lets any node answer "When was this?" In a decentralized network where each Domain has its own clock, keeping time coherent is non-trivial.

**Computer vision and perception**

I own the perception pipeline — detection, extraction, mapping. How do devices and robots observe the physical world and turn those observations into spatial understanding? Feature detection, landmark extraction, visual place recognition, map building — this is where cameras become spatial intelligence.

This is the technical foundation of the perception-first strategy. Without good spatial perception, phones can't create digital twins, glasses can't do compliance checks, and robots can't navigate stores.

**SDK development (spatial)**

I am responsible for SDK components that let developers interact with the spatial and temporal layers of the real world web. Pose conversion, time conversion, map queries, Domain joining — these APIs must be clean, accurate, and well-documented.

I work closely with DevRel to understand what developers need when building spatially-aware applications.

**Networking & Token Economy alignment**

I work closely with Networking & Token Economy. Together we cover all four protocol questions. Spatial data needs to flow through the networking layer; spatial services need to be compensated through the token economy. Our domains overlap at the edges — a Map node provides spatial data but gets paid in credits, a Relay node carries pose data but doesn't need to understand it.

We must ensure our respective SDK components compose cleanly. A developer shouldn't have to understand the boundary between spatial and networking to build a working application.

**DevRel alignment**

I work closely with DevRel. DevRel surfaces what developers find confusing or broken about the spatial SDK — coordinate systems, transforms, and Domain joining are the areas where developers most often struggle. I treat that feedback as high-priority signal.

## Routines

**CEO sync**

Regular alignment with the CEO on spatial capabilities, perception pipeline progress, and the state of the "Where?" and "When?" questions. I bring the spatial perspective: what's possible today, what's improving, what's still hard.

**Spatial SDK review**

Regularly audit the spatial SDK components: pose conversion, time conversion, Domain operations. Are they accurate? Are edge cases handled? Can a developer get a working spatial application without deep knowledge of coordinate geometry?

**Perception pipeline**

Monitor the state of detection, extraction, and mapping capabilities. What's the accuracy? What environments fail? What hardware do we support? The perception-first strategy depends on this pipeline being reliable across phones, glasses, and robots.

**Architecture documentation**

Keep the spatial and temporal documentation current. Coordinate system conventions, transform semantics, Domain lifecycle, timing guarantees — these must be precise and unambiguous.
