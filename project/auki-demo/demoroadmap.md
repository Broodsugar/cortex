# Roadmap

## Components

### Discovery Service

The Discovery Service is how nodes find each other to form clusters. A node queries the Discovery Service to find peers it wants to cluster with — once clustered, nodes advertise their capabilities and data products through the Cluster Registry (handled by the SDK). The Discovery Service is a decentralized registry where nodes can discover each other by capability, geography, or data product type without any central authority deciding who can participate.

### Credit Service

The Credit Service tracks credit balances and enforces the data economy. Every query for data costs credits: you pay the domain that provides the data. The Credit Service is the settlement layer that handles disputes, multi-party transactions, and balance reconciliation across domains that may not fully trust each other.

### Boxscout

Boxscout is a simple Three.js game loaded in the browser. It serves as a reference application for the Auki SDK — a minimal 3D environment where players move through a scene, their poses are written to the SDK's Pose Log every frame, and other players' purchased pose data is rendered as markers in the scene. Boxscout demonstrates the core SDK loop: generate poses, exchange them across domains via the protocol, and render the results.

### SDK

The Auki SDK is the core library that runs on every node. It owns the domain clock, the pose log (a ring buffer of timestamped positions and orientations), the coordinate system registry (mapping between OpenGL, Unity, ROS, ARKit, and Unreal conventions), and the transform store (spatial and temporal transforms between domains). Its two primary operations are `convert_pose` — which takes a pose from one domain's coordinate system and returns it in another's — and `convert_time` — which maps timestamps between domain clocks using offsets learned from heartbeats. The SDK also implements the cluster protocol: join handshakes, heartbeat streaming, and the query/response flow for purchasing data products.

### Mint

The Mint is a smart contract for burning dollar-denominated amounts of $AUKI tokens and issuing new credits to the burner. It is the on-ramp from the token economy into the credit economy: you destroy a dollar-denominated amount of tokens and receive a dollar-denominated amount of spendable credits in return. This creates deflationary pressure on the token supply proportional to actual network usage.

### Reward Pool

The Reward Pool is a reserve of $AUKI tokens that backs all outstanding credits. Every time a node burns $AUKI to acquire credits, the protocol mints new (but fewer) tokens into the Reward Pool — this is the deflationary mechanism. Any node holding credits can redeem them for $AUKI from the pool at any time, pro rata: a node holding X% of all outstanding credits can claim X% of the tokens in the pool. This ensures that credits always have a floor value, service providers can cash out their earnings, and the system self-balances — heavy usage grows the pool, light usage shrinks it.

### Cluster Registry

The Cluster Registry is the shared source of truth for who is in a domain cluster and what they can do. Every node in the cluster holds a full read-only replica; only the Manager Node writes to it. Each entry contains the node's network address, public key, capabilities, and data products. When a node joins, leaves, or updates its capabilities at runtime, the Manager Node updates the registry and broadcasts the change to all members immediately. The Cluster Registry is what allows any node in a cluster to find the right peer for a given task — if you need Reconstruction, you look up who advertises it; if you need a point cloud, you look up who serves one.
