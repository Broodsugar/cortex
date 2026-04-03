# Cluster Registry

The Cluster Registry is the shared source of truth for who is in a domain cluster and what they can do. Every node in the cluster holds a full read-only replica; only the Manager Node writes to it.

## Entry contents

Each entry contains:

- **Network address** — where to reach this node
- **Public key** — used to establish pairwise encrypted connections
- **Capabilities** — what this node can do (e.g. Reconstruction, Relay, QR_Reader)
- **Data products** — what data this node is willing to serve (e.g. Semantic layer, Point cloud)

## Lifecycle

- When a node **joins**, the Manager Node adds its entry and broadcasts the updated registry to all members
- When a node **leaves**, the Manager Node removes its entry and broadcasts the update
- When a node **updates its capabilities** at runtime, the Manager Node updates its entry and broadcasts immediately

The Cluster Registry is what allows any node in a cluster to find the right peer for a given task — if you need Reconstruction, you look up who advertises it; if you need a point cloud, you look up who serves one.
