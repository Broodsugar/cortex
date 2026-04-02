# Signaling Server — Implementation Plan

The signaling server's only job is to broker WebRTC connections between two browsers. It carries no game state, no SDK logic, no credit information. Once the data channel opens, the signaling server is no longer needed.

---

## Stack

- **Runtime**: Node.js
- **HTTP**: Express
- **WebSocket**: Socket.io (handles reconnect, rooms, and fallback transport for free)
- **Language**: TypeScript

---

## Concepts

**Room**: A short-lived pairing bucket. One creator, one joiner. The room ID is a random 6-character alphanumeric string (e.g. `A3F9K2`), short enough to read aloud or paste.

**Flow**:

```
Matthieu                    Server                         Nils
   │                          │                              │
   ├── create-room ──────────►│                              │
   │◄── room_id ─────────────┤                              │
   │                          │◄──────────── join-room ──────┤
   │                          ├── room_ready ───────────────►│
   │◄── room_ready ──────────┤                              │
   │                          │                              │
   │── sdp_offer ────────────►│── sdp_offer ────────────────►│
   │                          │◄── sdp_answer ──────────────┤
   │◄── sdp_answer ──────────┤                              │
   │                          │                              │
   │── ice_candidate ────────►│── ice_candidate ────────────►│
   │◄── ice_candidate ───────┤◄── ice_candidate ────────────┤
   │         ...              │         ...                  │
   │                          │                              │
   │◄═══════════ WebRTC data channel open ═══════════════════╡
   │                          │                              │
   │── disconnect ───────────►│                              │
   │                          ├── peer_disconnected ────────►│
```

---

## Socket.io Events

### Client → Server

| Event | Payload | Description |
|-------|---------|-------------|
| `create-room` | `{}` | Create a new room. Server responds with `room_created`. |
| `join-room` | `{ room_id: string }` | Join an existing room. Server responds with `room_ready` to both. |
| `sdp_offer` | `{ sdp: RTCSessionDescriptionInit }` | Forward WebRTC offer to the other peer. |
| `sdp_answer` | `{ sdp: RTCSessionDescriptionInit }` | Forward WebRTC answer to the other peer. |
| `ice_candidate` | `{ candidate: RTCIceCandidateInit }` | Forward ICE candidate to the other peer. |

### Server → Client

| Event | Payload | Description |
|-------|---------|-------------|
| `room_created` | `{ room_id: string }` | Room created successfully. Wait for a joiner. |
| `room_ready` | `{ peer_id: string }` | Both peers are in the room. Start WebRTC handshake. |
| `sdp_offer` | `{ sdp: RTCSessionDescriptionInit }` | Forwarded from the other peer. |
| `sdp_answer` | `{ sdp: RTCSessionDescriptionInit }` | Forwarded from the other peer. |
| `ice_candidate` | `{ candidate: RTCIceCandidateInit }` | Forwarded from the other peer. |
| `peer_disconnected` | `{}` | The other peer left. |
| `error` | `{ message: string }` | Room not found, room full, etc. |

---

## Server State

Minimal in-memory state. No persistence needed.

```ts
type Room = {
  id: string;
  creator: string;       // socket.id
  joiner: string | null; // socket.id
  created_at: number;    // Date.now()
};

const rooms: Map<string, Room> = new Map();
```

**Cleanup**: Rooms are deleted when both peers disconnect, or after 10 minutes (whichever comes first). A `setInterval` sweeps stale rooms every 60 seconds.

---

## Error Cases

| Situation | Server response |
|-----------|-----------------|
| `join-room` with invalid room_id | `error: "Room not found"` |
| `join-room` on a full room (2 peers already) | `error: "Room is full"` |
| Creator disconnects before joiner arrives | Delete room. Joiner gets `error: "Room not found"` if they try later. |
| One peer disconnects after pairing | Send `peer_disconnected` to the remaining peer. Delete room. |
| SDP/ICE sent before room is paired | `error: "No peer connected"` |

---

## File Structure

```
signaling-server/
├── src/
│   ├── index.ts          # Express + Socket.io setup, room management
│   ├── rooms.ts          # Room CRUD, cleanup logic
│   └── types.ts          # Shared type definitions
├── test/
│   ├── rooms.test.ts     # Unit tests for room logic
│   └── signaling.test.ts # Integration tests with socket.io-client
├── package.json
├── tsconfig.json
└── README.md
```

---

## Tests

### Unit Tests (rooms.test.ts)

Test the room logic in isolation, no sockets.

| Test | What it verifies |
|------|-----------------|
| `createRoom returns a 6-char alphanumeric ID` | Room ID format |
| `createRoom stores room with creator socket ID` | State correctness |
| `joinRoom sets joiner on existing room` | Join works |
| `joinRoom rejects invalid room ID` | Error: room not found |
| `joinRoom rejects full room` | Error: room full |
| `removeRoom deletes room from map` | Cleanup |
| `cleanupStaleRooms removes rooms older than 10 min` | TTL sweep |

### Integration Tests (signaling.test.ts)

Two socket.io-client instances connecting to the real server.

| Test | What it verifies |
|------|-----------------|
| `creator gets room_created with valid room_id` | Room creation flow |
| `joiner joins and both get room_ready` | Pairing flow |
| `sdp_offer from creator is forwarded to joiner` | SDP relay |
| `sdp_answer from joiner is forwarded to creator` | SDP relay |
| `ice_candidate from either peer is forwarded` | ICE relay |
| `creator disconnect sends peer_disconnected to joiner` | Disconnect handling |
| `joiner disconnect sends peer_disconnected to creator` | Disconnect handling |
| `join with bad room_id returns error` | Error path |
| `join on full room returns error` | Error path |
| `sdp_offer before pairing returns error` | Error path |

### End-to-End Smoke Test

A manual test script or simple HTML page:

1. Open two browser tabs pointing at a test page
2. Tab A clicks "Create Room", displays room ID
3. Tab B enters room ID, clicks "Join"
4. Both tabs show "Room ready"
5. Both tabs establish a WebRTC data channel
6. Tab A sends "hello" over the data channel, Tab B receives it
7. Tab B sends "world" over the data channel, Tab A receives it

This is the **done** test. If two browsers can exchange arbitrary messages over a WebRTC data channel brokered by the signaling server, the module is complete.

---

## Done Criteria

- [ ] Two browsers can create/join a room via the signaling server
- [ ] WebRTC data channel opens successfully between them
- [ ] Arbitrary JSON messages pass through the data channel (not through the server)
- [ ] Disconnection is detected and reported to the remaining peer
- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] Smoke test works with two browser tabs on localhost
