import { describe, it, expect, beforeEach } from "vitest";
import {
  createRoom,
  getRoom,
  joinRoom,
  removeRoom,
  cleanupStaleRooms,
  getRoomCount,
  clearAllRooms,
} from "../src/rooms.js";

beforeEach(() => {
  clearAllRooms();
});

describe("createRoom", () => {
  it("returns a 6-char alphanumeric ID", () => {
    const room = createRoom("socket-1");
    expect(room.id).toMatch(/^[A-Z2-9]{6}$/);
  });

  it("stores room with creator socket ID", () => {
    const room = createRoom("socket-1");
    const stored = getRoom(room.id);
    expect(stored).toBeDefined();
    expect(stored!.creator).toBe("socket-1");
    expect(stored!.joiner).toBeNull();
  });

  it("generates unique IDs", () => {
    const ids = new Set<string>();
    for (let i = 0; i < 100; i++) {
      ids.add(createRoom(`socket-${i}`).id);
    }
    expect(ids.size).toBe(100);
  });
});

describe("joinRoom", () => {
  it("sets joiner on existing room", () => {
    const room = createRoom("socket-1");
    const result = joinRoom(room.id, "socket-2");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.room.joiner).toBe("socket-2");
    }
  });

  it("rejects invalid room ID", () => {
    const result = joinRoom("BADID1", "socket-2");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Room not found");
    }
  });

  it("rejects full room", () => {
    const room = createRoom("socket-1");
    joinRoom(room.id, "socket-2");
    const result = joinRoom(room.id, "socket-3");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Room is full");
    }
  });
});

describe("removeRoom", () => {
  it("deletes room from map", () => {
    const room = createRoom("socket-1");
    expect(getRoomCount()).toBe(1);
    const removed = removeRoom(room.id);
    expect(removed).toBe(true);
    expect(getRoomCount()).toBe(0);
    expect(getRoom(room.id)).toBeUndefined();
  });

  it("returns false for nonexistent room", () => {
    expect(removeRoom("NOPE00")).toBe(false);
  });
});

describe("cleanupStaleRooms", () => {
  it("removes rooms older than 10 minutes", () => {
    const room = createRoom("socket-1");
    // Backdate the room's created_at
    const stored = getRoom(room.id)!;
    stored.created_at = Date.now() - 11 * 60 * 1000;

    expect(getRoomCount()).toBe(1);
    const removed = cleanupStaleRooms();
    expect(removed).toBe(1);
    expect(getRoomCount()).toBe(0);
  });

  it("keeps rooms younger than 10 minutes", () => {
    createRoom("socket-1");
    const removed = cleanupStaleRooms();
    expect(removed).toBe(0);
    expect(getRoomCount()).toBe(1);
  });
});
