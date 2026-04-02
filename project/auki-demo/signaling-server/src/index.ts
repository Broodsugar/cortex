import express from "express";
import { createServer } from "http";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import type { ClientToServerEvents, ServerToClientEvents } from "./types.js";
import {
  createRoom,
  joinRoom,
  findRoomBySocket,
  getPeerId,
  removeRoom,
  startCleanup,
  stopCleanup,
} from "./rooms.js";

const PORT = parseInt(process.env.PORT || "3000", 10);

export function createApp() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(
    httpServer,
    {
      cors: { origin: "*" },
    }
  );

  // Serve static files (smoke test page)
  const __dirname = dirname(fileURLToPath(import.meta.url));
  app.use(express.static(join(__dirname, "..", "public")));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  io.on("connection", (socket) => {
    socket.on("create-room", () => {
      const room = createRoom(socket.id!);
      socket.emit("room_created", { room_id: room.id });
    });

    socket.on("join-room", ({ room_id }) => {
      const result = joinRoom(room_id, socket.id!);
      if (!result.ok) {
        socket.emit("error", { message: result.error });
        return;
      }
      const { room } = result;
      // Notify both peers
      socket.emit("room_ready", { peer_id: room.creator });
      io.to(room.creator).emit("room_ready", { peer_id: socket.id! });
    });

    socket.on("sdp_offer", ({ sdp }) => {
      const room = findRoomBySocket(socket.id!);
      if (!room) return;
      const peerId = getPeerId(room, socket.id!);
      if (!peerId) {
        socket.emit("error", { message: "No peer connected" });
        return;
      }
      io.to(peerId).emit("sdp_offer", { sdp });
    });

    socket.on("sdp_answer", ({ sdp }) => {
      const room = findRoomBySocket(socket.id!);
      if (!room) return;
      const peerId = getPeerId(room, socket.id!);
      if (!peerId) {
        socket.emit("error", { message: "No peer connected" });
        return;
      }
      io.to(peerId).emit("sdp_answer", { sdp });
    });

    socket.on("ice_candidate", ({ candidate }) => {
      const room = findRoomBySocket(socket.id!);
      if (!room) return;
      const peerId = getPeerId(room, socket.id!);
      if (!peerId) {
        socket.emit("error", { message: "No peer connected" });
        return;
      }
      io.to(peerId).emit("ice_candidate", { candidate });
    });

    socket.on("disconnect", () => {
      const room = findRoomBySocket(socket.id!);
      if (!room) return;
      const peerId = getPeerId(room, socket.id!);
      if (peerId) {
        io.to(peerId).emit("peer_disconnected");
      }
      removeRoom(room.id);
    });
  });

  startCleanup();

  return { app, httpServer, io, stop: () => stopCleanup() };
}

// Only start listening when run directly (not imported for tests)
if (
  process.argv[1] &&
  (process.argv[1].endsWith("index.ts") ||
    process.argv[1].endsWith("index.js"))
) {
  const { httpServer } = createApp();
  httpServer.listen(PORT, () => {
    console.log(`Signaling server listening on port ${PORT}`);
  });
}
