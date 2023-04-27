
import io from "socket.io-client";
import { SOCKET_URL } from "../config/socket";

export const socket = io(SOCKET_URL);