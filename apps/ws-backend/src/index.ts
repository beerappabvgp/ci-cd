import { WebSocketServer } from 'ws';
import { client } from "@repo/db/client";

const wss = new WebSocketServer({ port: 3100 });

wss.on('connection', async (ws) => {
  ws.on('error', console.error);
  const user = await client.user.create({
    data: {
        username: Math.random().toString(),
        password: Math.random().toString(),
    }
  });
  console.log(user);
  ws.send(JSON.stringify(user));
  ws.on('message', (data) => {
    console.log('received: %s', data);
  });

  ws.send('Hi there from the web socket server  .... ');
});