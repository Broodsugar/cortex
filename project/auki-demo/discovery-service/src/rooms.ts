import type { Room } from "./types.js";

const ROOM_ID_LENGTH = 6;
const ROOM_TTL_MS = 10 * 60 * 1000; // 10 minutes
const CLEANUP_INTERVAL_MS = 60 * 1000; // 1 minute

const rooms = new Map<string, Room>();

function generateId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I/O/0/1 to avoid ambiguity
  let id = "";
  for (let i = 0; i < ROOM_ID_LENGTH; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export function createRoom(creatorSocketId: string): Room {
  let id = generateId();
  while (rooms.has(id)) {
    id = generateId();
  }
  const room: Room = {
    id,
    creator: creatorSocketId,
    joiner: null,
    created_at: Date.now(),
  };
  rooms.set(id, room);
  return room;
}

export function getRoom(roomId: string): Room | undefined {
  return rooms.get(roomId);
}

export function joinRoom(
  roomId: string,
  joinerSocketId: string
): { ok: true; room: Room } | { ok: false; error: string } {
  const room = rooms.get(roomId);
  if (!room) {
    return { ok: false, error: "Room not found" };
  }
  if (room.joiner !== null) {
    return { ok: false, error: "Room is full" };
  }
  room.joiner = joinerSocketId;
  return { ok: true, room };
}

export function removeRoom(roomId: string): boolean {
  return rooms.delete(roomId);
}

export function findRoomBySocket(socketId: string): Room | undefined {
  for (const room of rooms.values()) {
    if (room.creator === socketId || room.joiner === socketId) {
      return room;
    }
  }
  return undefined;
}

export function getPeerId(room: Room, socketId: string): string | null {
  if (room.creator === socketId) return room.joiner;
  if (room.joiner === socketId) return room.creator;
  return null;
}

export function cleanupStaleRooms(): number {
  const now = Date.now();
  let removed = 0;
  for (const [id, room] of rooms) {
    if (now - room.created_at > ROOM_TTL_MS) {
      rooms.delete(id);
      removed++;
    }
  }
  return removed;
}

export function getRoomCount(): number {
  return rooms.size;
}

export function clearAllRooms(): void {
  rooms.clear();
}

let cleanupTimer: ReturnType<typeof setInterval> | null = null;

export function startCleanup(): void {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(cleanupStaleRooms, CLEANUP_INTERVAL_MS);
}

export function stopCleanup(): void {
  if (cleanupTimer) {
    clearInterval(cleanupTimer);
    cleanupTimer = null;
  }
}
