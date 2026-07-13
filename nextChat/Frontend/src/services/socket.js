import { io } from "socket.io-client";
// Frontend socket connection
const socket = io("http://localhost:3000", {
  transports: ["websocket"] // websocket ko priority dein
});


export default socket;
