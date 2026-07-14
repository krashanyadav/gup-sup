import { io } from "socket.io-client";
// Frontend socket connection
const socket = io(import.meta.env.VITE_API_URL_SORT, {
  transports: ["websocket"] // websocket ko priority dein
});


export default socket;
