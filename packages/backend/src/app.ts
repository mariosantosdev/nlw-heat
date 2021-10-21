import 'dotenv/config'
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from "socket.io";

import routes from './routes';

const app = express();
app.use(cors())

const serverHttp = http.createServer(app);

app.use(express.json())
app.use(routes);

const io = new Server(serverHttp, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log(`New user connected: ${socket.id}`)
})

export { serverHttp, io };