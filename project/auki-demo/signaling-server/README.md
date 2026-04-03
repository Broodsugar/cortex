# Signaling Server

A lightweight Socket.io server that brokers WebRTC connections between two browsers. Once the WebRTC data channel opens, the signaling server is no longer needed — messages flow peer-to-peer.

## Architecture

```
Browser A                 Signaling Server                 Browser B
   │                          │                              │
   ├── create-room ──────────►│                              │
   │◄── room_id ─────────────┤                              │
   │                          │◄──────────── join-room ──────┤
   │                          │                              │
   │   (WebRTC handshake relayed through server)             │
   │                          │                              │
   │◄═══════════ WebRTC data channel open ═══════════════════╡
   │         (server no longer needed)                       │
```

If WebRTC fails (e.g. restrictive NAT), the server also supports a `relay_message` fallback where messages pass through the server instead of peer-to-peer.

## Quick Start (demo with ngrok)

Run both the server and ngrok in one go:

```bash
cd /Users/nilspihl/exocortex/project/auki-demo/signaling-server
npm run dev &
ngrok http 3000 &
sleep 2
# Print the public URL
curl -s http://localhost:4040/api/tunnels | python3 -c "import sys,json; print(json.load(sys.stdin)['tunnels'][0]['public_url'])"
```

Then open `<ngrok-url>/matthieu.html` on one device and `<ngrok-url>/nils.html` on the other.

## Running Locally (without ngrok)

```bash
# Install dependencies (first time only)
npm install

# Start the dev server
npm run dev
```

The server starts on **port 3000** by default. Override with `PORT=8080 npm run dev`.

## Exposing to the Internet with ngrok

To let someone on another network connect (e.g. showing the demo to Matthieu), you need a public URL. ngrok tunnels localhost to a public HTTPS endpoint.

```bash
ngrok http 3000
```

ngrok will print a forwarding URL like `https://xxxx-xx-xx.ngrok-free.app`. Share that URL — it points to your local server.

You can check your active tunnel URL anytime:

```bash
curl -s http://localhost:4040/api/tunnels | python3 -c "import sys,json; print(json.load(sys.stdin)['tunnels'][0]['public_url'])"
```

## Smoke Test

Open the smoke test page in your browser:

- **Local**: `http://localhost:3000/smoke-test.html`
- **Via ngrok**: `https://xxxx.ngrok-free.app/smoke-test.html`

The page has two panels (Matthieu and Nils) side by side. To test:

1. Click **Create Room** in the left panel
2. The room ID auto-fills in the right panel — click **Join Room**
3. Both panels should show "Data channel OPEN"
4. Type messages and hit Send — they flow over WebRTC

For a real two-device test, open `matthieu.html` on one device and `nils.html` on the other, both via the ngrok URL.

## Running Tests

```bash
# Run all tests once
npm test

# Watch mode
npm run test:watch
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start server with tsx (hot reload) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled JS from `dist/` |
| `npm test` | Run unit + integration tests |

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
