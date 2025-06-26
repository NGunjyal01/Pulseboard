import { io } from 'socket.io-client';

const socket = io('http://localhost:4444', {
    withCredentials: true,
});

export default socket;