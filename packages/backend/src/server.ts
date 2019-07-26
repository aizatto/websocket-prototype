import * as WebSocket from 'ws';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

const wss = new WebSocket.Server({
  port: PORT,
  verifyClient: (info, cb) => {
    if (process.env.NODE_ENV === 'production') {
      if (!info.secure) {
        cb(false, 401);
      } else {
        cb(true);
      }
    } else {
      cb(true);
    }
  }
});

wss.on('connection', (ws: WebSocket) => {
  console.log(`${new Date()}: Connection open on port: ${PORT}`);
  ws.send('Connected to server');

  ws.on('close', () => {
    console.log(`disconnected: ${ws}`);
  });

  ws.on('message', async (data: WebSocket.Data) => {
    console.log(data);
  });
});