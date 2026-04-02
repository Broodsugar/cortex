# Demo Plan 2 — Implementation Plan

Implementation plan for the browser-to-browser pose exchange demo described in [auki-sdk/demoplan2.md](auki-sdk/demoplan2.md).

---

## Architecture

```
Browser A (Matthieu)          Signaling Server          Browser B (Nils)
┌─────────────────┐          ┌──────────────┐          ┌─────────────────┐
│  Three.js Scene  │          │   Express +  │          │  Three.js Scene  │
│  SDK Core        │◄────────►│   Socket.io  │◄────────►│  SDK Core        │
│  Manager Logic   │          └──────────────┘          │  Joiner Logic    │
│  WebRTC Peer     │◄──────── data channel ───────────►│  WebRTC Peer     │
│  HUD             │                                    │  HUD             │
└─────────────────┘                                    └─────────────────┘
```

All SDK logic runs in the browser. The signaling server only brokers the WebRTC handshake — no game state, no relay.

---

## Modules

### 1. Signaling Server

**What**: Minimal Node.js server that pairs two browsers and exchanges WebRTC SDP offers/answers + ICE candidates.

**Stack**: Express + Socket.io (or plain WebSocket)

**Endpoints**:
- `create-room` — Matthieu creates a room, gets a room ID
- `join-room` — Nils joins with the room ID
- Relays SDP and ICE messages between the two peers

**Done when**: Two browsers can open a WebRTC data channel through the server.

**Dependencies**: None. Build this first.

---

### 2. WebRTC Data Channel

**What**: A reliable data channel between the two browsers for all SDK messages.

**Wire format**: JSON over a single reliable data channel. Every message has an envelope:

```json
{
  "type": "heartbeat" | "join_request" | "join_accept" | "registry_update" | "query" | "query_response" | "credit_transfer",
  "from": "matthieu" | "nils",
  "timestamp": 48350,
  "payload": { ... }
}
```

**Done when**: Both browsers can send and receive JSON messages over the data channel.

**Dependencies**: Signaling Server.

---

### 3. Coordinate System Registry

**What**: A lookup table of known coordinate conventions. Immutable, ships with the SDK.

```js
const CONVENTIONS = {
  opengl:  { handedness: "right", up: "Y", forward: "-Z", quat_order: "XYZW" },
  unity:   { handedness: "left",  up: "Y", forward: "Z",  quat_order: "XYZW" },
  ros:     { handedness: "right", up: "Z", forward: "X",  quat_order: "XYZW" },
  arkit:   { handedness: "right", up: "Y", forward: "-Z", quat_order: "XYZW" },
  unreal:  { handedness: "left",  up: "Z", forward: "X",  quat_order: "WXYZ" }
}
```

**Convention correction function**: Given a pose in convention A, return it in convention B. Handles:
- Axis remapping (which axis is up, which is forward)
- Handedness flip (negate one axis)
- Quaternion reorder (XYZW vs WXYZ)

**Done when**: `correctConvention(pose, "opengl", "unity")` returns correct results for all 5 conventions. Unit-testable in isolation.

**Dependencies**: None. Can be built in parallel with everything else.

---

### 4. SDK Core

**What**: The core data structures and operations that both browsers use.

#### 4a. Domain Clock

A monotonically increasing counter starting at 0 when `sdk.init()` is called. Backed by `performance.now()`.

```js
sdk.init({ domain_id, system_time, coordinate_system })
// Records:
//   clock_start = performance.now()
//   system_time_at_start = system_time (ms since epoch)
// Domain time = performance.now() - clock_start
```

#### 4b. Pose Log

Ring buffer of Moments. Written every frame from camera position.

```js
Moment {
  domain_id:    string,
  timestamp:    number,     // domain time in ms
  position:     { x, y, z },
  orientation:  { qx, qy, qz, qw }
}
```

Fixed-size buffer (e.g. 600 entries = ~10 seconds at 60fps). Oldest entries drop off.

#### 4c. Transforms Store

Holds SpatialTransforms and TimeTransforms, keyed by domain pair.

```js
SpatialTransform {
  from:        string,   // domain_id
  to:          string,   // domain_id
  matrix:      number[16],  // 4x4 affine transform (includes convention correction)
  measured_at: number    // domain time when recorded
}

TimeTransform {
  from:        string,
  to:          string,
  offset:      number,   // milliseconds
  uncertainty: number,   // milliseconds
  measured_at: number,
  source:      string    // "system_clock" | "heartbeat"
}
```

#### 4d. convert_pose

```js
convert_pose(moment, from_domain, to_domain) → Moment
```

1. Look up SpatialTransform from → to
2. Apply the 4x4 matrix to position
3. Apply rotation component to orientation
4. Return new Moment with to_domain's domain_id

#### 4e. convert_time

```js
convert_time(timestamp, from_domain, to_domain) → number
```

Look up TimeTransform, apply offset.

**Done when**: All data structures exist, Pose Log accumulates Moments, convert_pose and convert_time produce correct output. Unit-testable.

**Dependencies**: Coordinate System Registry (for building the SpatialTransform matrix).

---

### 5. Cluster Protocol

**What**: The message exchange for joining, heartbeats, registry, and queries.

#### 5a. Join flow

1. Nils sends `join_request` with his node info (name, capabilities, data_products)
2. Matthieu sends `join_accept` with the full cluster registry
3. Matthieu broadcasts `registry_update` (now includes Nils)

#### 5b. Heartbeat

Matthieu sends every **2 seconds**:

```json
{
  "type": "heartbeat",
  "payload": {
    "domain_id": "matthieu-01",
    "domain_time": 5000,
    "system_time": 1743602405000
  }
}
```

Nils uses this to compute/update his TimeTransform for matthieu-01.

If no heartbeat for 10 seconds: show "Connection lost" in HUD.

#### 5c. Query flow

1. Buyer sends `query` with target node, data_product, and filter
2. Both sides apply `credit_transfer` locally (optimistic — no central ledger)
3. Seller sends `query_response` with the data

**Done when**: Two browsers can complete the full join → heartbeat → query cycle over the data channel.

**Dependencies**: WebRTC Data Channel, SDK Core.

---

### 6. Credit Ledger

**What**: Local balance tracker. Each browser maintains its own view of both balances.

```js
CreditLedger {
  balances: { [node_name]: number },
  log: [ { from, to, amount, reason, timestamp } ]
}
```

Both sides apply the same debit/credit on each transaction. No conflict resolution needed for this demo — both sides see the same messages in the same order (reliable channel).

**Edge case — zero credits**: Button greys out. Cannot purchase. HUD shows "Insufficient credits."

**Done when**: Balances update correctly on both sides for every transaction type.

**Dependencies**: Cluster Protocol.

---

### 7. Three.js Scene

**What**: A shared 3D room that both browsers render.

- 50 square meters (roughly 7m x 7m)
- Flat floor, various coloured boxes scattered around
- Camera controls: WASD + mouse look (pointer lock)
- Convention dropdown on landing screen (determines which coordinate system the scene uses internally — the Three.js camera pose gets written to the Pose Log in the chosen convention)

**Spawn points**:
- Matthieu: origin `{ 0, 0, 0 }` in his convention
- Nils: 2 meters behind Matthieu's origin (in Matthieu's convention, this is `{ 0, 0, 2 }` in opengl / `{ 0, 0, -2 }` in unity)

**Marker**: A coloured sphere (or axis gizmo) rendered at the other player's converted position. Appears on first pose purchase. Updates position on each subsequent purchase. Fades to 50% opacity after 5 seconds to signal staleness.

**Done when**: The room renders, camera moves, Moments are written to the Pose Log each frame.

**Dependencies**: SDK Core (Pose Log, Moment).

---

### 8. HUD

**What**: Overlay UI showing live state.

| Element | Updates |
|---------|---------|
| Credits | On every transaction |
| Coordinate space | Set at init |
| Convention | Set at init |
| Domain time | Every frame (ms counter) |
| Current pose | Every frame (x, y, z) |
| "Buy Transform" button | Nils only. Active until purchased, then hidden |
| "Buy Latest Pose" button | Both. Greyed out until transform acquired |
| Event log | On every protocol event (join, heartbeat, purchase) |
| Connection status | On heartbeat timeout |

**Done when**: All HUD elements render and update correctly.

**Dependencies**: Everything (this is the integration layer).

---

## Build Order

```
Week 1: Foundation
├── Signaling Server (1)
├── Coordinate System Registry (3) ← can parallel
└── SDK Core data structures (4a-4c) ← can parallel

Week 2: Networking + Protocol
├── WebRTC Data Channel (2) ← needs Signaling Server
├── convert_pose + convert_time (4d-4e) ← needs Registry + Core
└── Cluster Protocol (5) ← needs Data Channel + Core

Week 3: Scene + Integration
├── Three.js Scene (7) ← needs Core (Pose Log)
├── Credit Ledger (6) ← needs Protocol
└── HUD (8) ← needs everything

Week 4: Polish + Test
├── End-to-end testing with two browsers
├── Edge cases (credit exhaustion, disconnect, reconnect)
└── Convention correctness across all 5 systems
```

---

## Open Questions

| Question | Impact | Notes |
|----------|--------|-------|
| Should the marker show a trail of past positions? | UX | Cool but adds complexity. Start with single marker. |
| Do we need TURN for the demo? | Infra | Only if Matthieu and Nils are behind restrictive NATs. Skip for v1, add if needed. |
| Should heartbeat frequency be configurable? | Design | 2 seconds is fine for demo. Hardcode. |
| What happens on page refresh? | UX | Session lost. Acceptable for demo. |
| Should we persist credit history? | Design | In-memory only. Refreshing resets to 100. |
