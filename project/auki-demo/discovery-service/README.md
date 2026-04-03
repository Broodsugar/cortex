# Discovery Service

The Discovery Service is how nodes find each other to form clusters. It is a public directory that allows devices to find and join domain clusters — the entry point to the Auki network. When a device encounters an identifier in the physical world (a QR code, a MAC address, or any registered uid), it queries the Discovery Service, which returns the address of the domain's Manager Node. The device then authenticates with the Manager Node and joins the cluster.

The Discovery Service sits outside of domain clusters. It operates on the public network, before any cluster membership is established.

## What it stores

A domains table. Each entry contains:

- **domainID** — the unique identifier of the domain
- **Manager Node address(es)** — where to connect to join the cluster
- **Geographic location** — the geofence or location of the domain
- **Supported localization methods** — which Detector types can be used to localize within this domain
- **Associated uids** — one or more identifiers that resolve to this domain, each with optional geometry
- **Adjacent domains** — a list of domainIDs that this domain has a known transform to

It also maintains a registry of **recruitable nodes** — nodes that have staked $AUKI for a capability and are available to be recruited into clusters.

## Queries

- **By uid** — given a uid, return the associated domain and its Manager address(es)
- **By capability** — given a location and a Detector type, return all domains in that area supporting that localization method
- **By adjacency** — given a domainID, return all domains with a known transform to it
- **By recruitable capability** — given a capability name and optional region, return all recruitable nodes

Registering a domain and querying the Discovery Service both cost credits.

## Current state

The current implementation is an embryonic signaling server — a minimal Node.js broker (Express + Socket.io) that pairs two browsers and exchanges WebRTC SDP offers/answers and ICE candidates. It handles room creation, joining, and relay fallback when WebRTC fails. This is the seed that will grow into the full Discovery Service.

See the existing code in `src/` and tests in `test/`.

## Quick Start (demo with ngrok)

Run both the server and ngrok in one go:

```bash
cd /Users/nilspihl/exocortex/project/auki-demo/discovery-service
npm run dev &
ngrok http 3000 &
sleep 2
# Print the public URL
curl -s http://localhost:4040/api/tunnels | python3 -c "import sys,json; print(json.load(sys.stdin)['tunnels'][0]['public_url'])"
```

Then open `<ngrok-url>/matthieu.html` on one device and `<ngrok-url>/nils.html` on the other.

## Running Locally (without ngrok)

```bash
npm install    # First time only
npm run dev    # Start on port 3000
```

Override the port with `PORT=8080 npm run dev`.

## Tests

```bash
npm test             # Run all tests
npm run test:watch   # Watch mode
```

## File Structure

```
src/
  index.ts    # Express + Socket.io setup, event handlers
  rooms.ts    # Room CRUD, cleanup logic
  types.ts    # Shared TypeScript types
public/
  smoke-test.html   # Two-panel test page (both peers in one tab)
  matthieu.html     # Creator page (for separate device testing)
  nils.html         # Joiner page (for separate device testing)
test/
  rooms.test.ts     # Unit tests for room logic
  signaling.test.ts # Integration tests with socket.io-client
```
