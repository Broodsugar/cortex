import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { io as ioClient, Socket } from "socket.io-client";
import { createApp } from "../src/index.js";
import { clearAllRooms } from "../src/rooms.js";
import type { Server } from "http";

let httpServer: Server;
let stop: () => void;
let port: number;

function createClient(): Socket {
  return ioClient(`http://localhost:${port}`, {
    transports: ["websocket"],
    forceNew: true,
  });
}

function waitFor<T>(socket: Socket, event: string): Promise<T> {
  return new Promise((resolve) => {
    socket.once(event, (data: T) => resolve(data));
  });
}

beforeAll(
  () =>
    new Promise<void>((resolve) => {
      const app = createApp();
      httpServer = app.httpServer;
      stop = app.stop;
      httpServer.listen(0, () => {
        const addr = httpServer.address();
        port = typeof addr === "object" && addr ? addr.port : 3000;
        resolve();
      });
    })
);

afterAll(
  () =>
    new Promise<void>((resolve) => {
      stop();
      httpServer.close(() => resolve());
    })
);

beforeEach(() => {
  clearAllRooms();
});

describe("room creation", () => {
  it("creator gets room_created with valid room_id", async () => {
    const client = createClient();
    await waitFor(client, "connect");

    client.emit("create-room");
    const data = await waitFor<{ room_id: string }>(client, "room_created");

    expect(data.room_id).toMatch(/^[A-Z2-9]{6}$/);
    client.disconnect();
  });
});

describe("room joining", () => {
  it("joiner joins and both get room_ready", async () => {
    const creator = createClient();
    const joiner = createClient();
    await Promise.all([
      waitFor(creator, "connect"),
      waitFor(joiner, "connect"),
    ]);

    creator.emit("create-room");
    const { room_id } = await waitFor<{ room_id: string }>(
      creator,
      "room_created"
    );

    const creatorReady = waitFor<{ peer_id: string }>(creator, "room_ready");
    const joinerReady = waitFor<{ peer_id: string }>(joiner, "room_ready");

    joiner.emit("join-room", { room_id });

    const [cr, jr] = await Promise.all([creatorReady, joinerReady]);
    expect(cr.peer_id).toBe(joiner.id);
    expect(jr.peer_id).toBe(creator.id);

    creator.disconnect();
    joiner.disconnect();
  });

  it("join with bad room_id returns error", async () => {
    const client = createClient();
    await waitFor(client, "connect");

    client.emit("join-room", { room_id: "BADID1" });
    const data = await waitFor<{ message: string }>(client, "error");

    expect(data.message).toBe("Room not found");
    client.disconnect();
  });

  it("join on full room returns error", async () => {
    const creator = createClient();
    const joiner1 = createClient();
    const joiner2 = createClient();
    await Promise.all([
      waitFor(creator, "connect"),
      waitFor(joiner1, "connect"),
      waitFor(joiner2, "connect"),
    ]);

    creator.emit("create-room");
    const { room_id } = await waitFor<{ room_id: string }>(
      creator,
      "room_created"
    );

    joiner1.emit("join-room", { room_id });
    await waitFor(joiner1, "room_ready");

    joiner2.emit("join-room", { room_id });
    const data = await waitFor<{ message: string }>(joiner2, "error");

    expect(data.message).toBe("Room is full");

    creator.disconnect();
    joiner1.disconnect();
    joiner2.disconnect();
  });
});

describe("SDP relay", () => {
  it("sdp_offer from creator is forwarded to joiner", async () => {
    const creator = createClient();
    const joiner = createClient();
    await Promise.all([
      waitFor(creator, "connect"),
      waitFor(joiner, "connect"),
    ]);

    creator.emit("create-room");
    const { room_id } = await waitFor<{ room_id: string }>(
      creator,
      "room_created"
    );

    joiner.emit("join-room", { room_id });
    await Promise.all([
      waitFor(creator, "room_ready"),
      waitFor(joiner, "room_ready"),
    ]);

    const offerReceived = waitFor<{ sdp: unknown }>(joiner, "sdp_offer");
    creator.emit("sdp_offer", { sdp: { type: "offer", sdp: "fake-sdp" } });
    const data = await offerReceived;

    expect(data.sdp).toEqual({ type: "offer", sdp: "fake-sdp" });

    creator.disconnect();
    joiner.disconnect();
  });

  it("sdp_answer from joiner is forwarded to creator", async () => {
    const creator = createClient();
    const joiner = createClient();
    await Promise.all([
      waitFor(creator, "connect"),
      waitFor(joiner, "connect"),
    ]);

    creator.emit("create-room");
    const { room_id } = await waitFor<{ room_id: string }>(
      creator,
      "room_created"
    );

    joiner.emit("join-room", { room_id });
    await Promise.all([
      waitFor(creator, "room_ready"),
      waitFor(joiner, "room_ready"),
    ]);

    const answerReceived = waitFor<{ sdp: unknown }>(creator, "sdp_answer");
    joiner.emit("sdp_answer", { sdp: { type: "answer", sdp: "fake-answer" } });
    const data = await answerReceived;

    expect(data.sdp).toEqual({ type: "answer", sdp: "fake-answer" });

    creator.disconnect();
    joiner.disconnect();
  });
});

describe("ICE relay", () => {
  it("ice_candidate from either peer is forwarded", async () => {
    const creator = createClient();
    const joiner = createClient();
    await Promise.all([
      waitFor(creator, "connect"),
      waitFor(joiner, "connect"),
    ]);

    creator.emit("create-room");
    const { room_id } = await waitFor<{ room_id: string }>(
      creator,
      "room_created"
    );

    joiner.emit("join-room", { room_id });
    await Promise.all([
      waitFor(creator, "room_ready"),
      waitFor(joiner, "room_ready"),
    ]);

    // Creator → Joiner
    const iceToJoiner = waitFor<{ candidate: unknown }>(
      joiner,
      "ice_candidate"
    );
    creator.emit("ice_candidate", { candidate: { candidate: "c1" } });
    const d1 = await iceToJoiner;
    expect(d1.candidate).toEqual({ candidate: "c1" });

    // Joiner → Creator
    const iceToCreator = waitFor<{ candidate: unknown }>(
      creator,
      "ice_candidate"
    );
    joiner.emit("ice_candidate", { candidate: { candidate: "c2" } });
    const d2 = await iceToCreator;
    expect(d2.candidate).toEqual({ candidate: "c2" });

    creator.disconnect();
    joiner.disconnect();
  });
});

describe("disconnect handling", () => {
  it("creator disconnect sends peer_disconnected to joiner", async () => {
    const creator = createClient();
    const joiner = createClient();
    await Promise.all([
      waitFor(creator, "connect"),
      waitFor(joiner, "connect"),
    ]);

    creator.emit("create-room");
    const { room_id } = await waitFor<{ room_id: string }>(
      creator,
      "room_created"
    );

    joiner.emit("join-room", { room_id });
    await Promise.all([
      waitFor(creator, "room_ready"),
      waitFor(joiner, "room_ready"),
    ]);

    const disconnected = waitFor(joiner, "peer_disconnected");
    creator.disconnect();
    await disconnected;

    joiner.disconnect();
  });

  it("joiner disconnect sends peer_disconnected to creator", async () => {
    const creator = createClient();
    const joiner = createClient();
    await Promise.all([
      waitFor(creator, "connect"),
      waitFor(joiner, "connect"),
    ]);

    creator.emit("create-room");
    const { room_id } = await waitFor<{ room_id: string }>(
      creator,
      "room_created"
    );

    joiner.emit("join-room", { room_id });
    await Promise.all([
      waitFor(creator, "room_ready"),
      waitFor(joiner, "room_ready"),
    ]);

    const disconnected = waitFor(creator, "peer_disconnected");
    joiner.disconnect();
    await disconnected;

    creator.disconnect();
  });
});

describe("error paths", () => {
  it("sdp_offer before pairing returns no error (silently dropped)", async () => {
    const client = createClient();
    await waitFor(client, "connect");

    // Not in any room — sdp_offer should be silently ignored
    client.emit("sdp_offer", { sdp: { type: "offer", sdp: "fake" } });

    // Give it a moment — no crash, no error
    await new Promise((r) => setTimeout(r, 100));
    client.disconnect();
  });
});
