Despite software having eaten the world, 70% of the world's economy is still tied to physical locations and physical labor. AI has transformed how we search, write, code, and communicate — but it still can't see the room you're standing in. It doesn't know where your shelves are, what's on them, or how to get from aisle 3 to the loading dock.

The physical world is invisible to AI. And until that changes, the biggest opportunity for technology to be transformative remains untouched.

At Auki Labs, we're building the real world web — a decentralized protocol that makes physical space browsable, searchable, and navigable to AI, robots, and humans. Our mission is to increase the intercognitive capacity of civilization: our ability to think, experience, and solve problems together.

The protocol answers four questions about any node in the network:

- **Where is this?**
- **When was this?**
- **How can I talk to you?**
- **How can I compensate you?**

The first two questions are the hardest. Physical space doesn't come with coordinates. There is no global reference frame. Every room, every warehouse, every street corner has to build its own spatial understanding — its own map, its own clock, its own coordinate system. And then those local understandings have to be bridged, so a robot that knows where it is in one Domain can reason about its relationship to another.

This is the problem you must face.

---

## The Role: Spatial Intelligence Lead

I own how the real world web understands the physical world in space and time. Domains, coordinate systems, transforms, landmarks, maps, clocks, synchronization — the infrastructure that answers "Where is this?" and "When was this?"

This is the technical foundation of everything Auki does. Without reliable spatial intelligence, phones can't create digital twins, glasses can't do compliance checks, robots can't navigate stores, and our [perception-first strategy](https://x.com/broodsugar/status/2029098452760846574) falls apart. Every device and robot on the network depends on my work to know where it is and when things happened.

## Responsibilities

**Spatial reasoning**

I own how the real world web represents and reasons about physical space. Every Domain has its own coordinate system — there is no global frame. Transforms are the bridges between Domains. I am responsible for making this work reliably, accurately, and at scale.

**Temporal reasoning**

I own how the real world web understands time. In a decentralized network where each Domain has its own clock, keeping time coherent is non-trivial. Timestamps, synchronization, temporal transforms — all mine.

**Computer vision and perception**

I own the perception pipeline — detection, extraction, mapping. How do devices and robots turn camera frames into spatial understanding? Feature detection, landmark extraction, visual place recognition, map building. This is where cameras become spatial intelligence, and it's what makes the perception-first strategy technically possible.

**SDK development (spatial)**

I build the SDK components that let developers interact with the spatial and temporal layers: pose conversion, time conversion, map queries, Domain joining. These APIs must be clean, accurate, and well-documented.

**Networking & Token Economy alignment**

I work closely with Networking & Token Economy. Together we cover all four protocol questions. Spatial data flows through the networking layer; spatial services get compensated through the token economy. Our SDK components must compose cleanly — a developer shouldn't have to understand the boundary between spatial and networking to build a working application.

**DevRel alignment**

I work closely with DevRel. Coordinate systems, transforms, and Domain joining are where developers most often struggle. DevRel surfaces that pain; I fix the underlying cause.

## Routines

**CEO sync**

Regular alignment with the CEO on spatial capabilities, perception pipeline progress, and the state of "Where?" and "When?" I bring the spatial perspective: what's possible today, what's improving, what's still hard.

**Spatial SDK review**

Regularly audit the spatial SDK: pose conversion, time conversion, Domain operations. Can a developer get a working spatial application without deep knowledge of coordinate geometry?

**Perception pipeline**

Monitor detection, extraction, and mapping capabilities. What's the accuracy? What environments fail? What hardware do we support? The perception-first strategy depends on this pipeline being reliable across phones, glasses, and robots.

**Architecture documentation**

Keep spatial and temporal documentation precise and current. Coordinate system conventions, transform semantics, Domain lifecycle, timing guarantees — ambiguity here causes bugs everywhere downstream.