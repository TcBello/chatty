import { io } from "socket.io-client";

// export const socket = io("http://localhost:3001");
export const socket = io("https://tcbello-chatty-api.vercel.app", {
  transports: ["websocket"],
});
