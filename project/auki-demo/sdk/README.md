# Auki SDK

The Auki SDK is the core library that runs on every node. It helps nodes agree what time it is and communicate across coordinate systems. The two atomic operations at the heart of everything:

- **`convert_time`** — map a timestamp from one clock to another
- **`convert_pose`** — map a pose from one coordinate system to another, with automatic convention correction

Every other concept in the network — clusters, maps, detectors, credits — exists to produce the transforms that feed into these two operations.

## Core components

- **Domain Clock** — a monotonically increasing counter started from zero when the domain is created. All Moments are timestamped in domain time.
- **Pose Log** — a ring buffer of Moments recording a node's trajectory continuously in its own coordinate system.
- **Coordinate System Registry** — a lookup table of known coordinate conventions (OpenGL, Unity, ROS, ARKit, Unreal) with axis mappings, handedness, and quaternion order.
- **Transform Store** — holds SpatialTransforms and TimeTransforms between domains, keyed by domain pair.
- **Cluster Protocol** — join handshakes, heartbeat streaming, and the query/response flow for purchasing data products.

## Submodules

- [Cluster Registry](cluster-registry/) — the shared source of truth for cluster membership and capabilities
