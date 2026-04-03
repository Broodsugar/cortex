export type Room = {
  id: string;
  creator: string; // socket.id
  joiner: string | null; // socket.id
  created_at: number; // Date.now()
};

// Client → Server events
export interface ClientToServerEvents {
  "create-room": () => void;
  "join-room": (payload: { room_id: string }) => void;
  sdp_offer: (payload: { sdp: unknown }) => void;
  sdp_answer: (payload: { sdp: unknown }) => void;
  ice_candidate: (payload: { candidate: unknown }) => void;
  relay_message: (payload: { data: unknown }) => void;
}

// Server → Client events
export interface ServerToClientEvents {
  room_created: (payload: { room_id: string }) => void;
  room_ready: (payload: { peer_id: string }) => void;
  sdp_offer: (payload: { sdp: unknown }) => void;
  sdp_answer: (payload: { sdp: unknown }) => void;
  ice_candidate: (payload: { candidate: unknown }) => void;
  relay_message: (payload: { data: unknown }) => void;
  peer_disconnected: () => void;
  error: (payload: { message: string }) => void;
}
